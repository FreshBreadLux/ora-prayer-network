import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import FormSupportSection from './formSupportSection'
import FormPaymentSection from './formPaymentSection'
import FormReviewSection from './formReviewSection'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class StripeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyDonation: '',
      singleDonation: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      checkEmailReturned: false,
      userExists: false,
      stripeCustomerExists: false,
      address: '',
      city: '',
      state: '',
      zip: '',
      isLoading: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDonationAmount = this.handleDonationAmount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.subscribeOrCharge = this.subscribeOrCharge.bind(this)
    this.createCustomer = this.createCustomer.bind(this)
    this.createUserWithCustomerId = this.createUserWithCustomerId.bind(this)
    this.verifyUser = this.verifyUser.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    const { token, error } = await this.props.stripe.createToken()
    if (error) {
      console.error('Error: ', error.message)
    } else {
      const { userExists, stripeCustomerExists } = this.state
      if (!userExists) {
        this.createCustomer(token)
        .then(customer => this.createUserWithCustomerId(customer.data))
        .then(verifiedResult => this.subscribeOrCharge(verifiedResult))
        .catch(console.error)
      } else if (userExists && !stripeCustomerExists) {
        this.createCustomer(token)
        .then(customer => this.verifyUser(customer.data))
        .then(verifiedResult => {
          this.updateUserWithCustomerId(verifiedResult)
          return this.subscribeOrCharge(verifiedResult)
        })
        .catch(console.error)
      }
    }
  }

  createCustomer(token) {
    const { email } = this.state
    return axios.post(`${ROOT_URL}/api/donations/customers`, { email, token })
  }

  createUserWithCustomerId(customer) {
    const { firstName, lastName, email, password, address, city, state, zip } = this.state
    return axios.post(`${ROOT_URL}/api/users`, {
      stripeCustomerId: customer.id,
      firstName, lastName, email, password, address, city, state, zip
    }).then(userIdAndJwt => {
      return { userIdAndJwt: userIdAndJwt.data, customer }
    })
  }

  verifyUser(customer) {
    const { email, password } = this.state
    return axios.post(`${ROOT_URL}/api/users/sessions`, { email, password })
    .then(userIdAndJwt => {
      return { userIdAndJwt: userIdAndJwt.data, customer }
    })
  }

  updateUserWithCustomerId(verifiedResult) {
    const { userIdAndJwt, customer } = verifiedResult
    const { firstName, lastName, address, city, state, zip } = this.state
    axios.put(`${ROOT_URL}/api/users/${userIdAndJwt.userId}`, {
      stripeCustomerId: customer.id,
      firstName, lastName, address, city, state, zip
    })
    .catch(console.error)
  }

  subscribeOrCharge(verifiedResult) {
    const { userId, jwToken } = verifiedResult.userIdAndJwt
    const { monthlyDonation, singleDonation } = this.state
    if (singleDonation.length) {
      axios.post(`${ROOT_URL}/api/donations/charges`, {
        userId, amount: +singleDonation * 100
      }, {
        headers: {token: jwToken}
      })
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    } else {
      axios.post(`${ROOT_URL}/api/donations/subscriptions`, {
        userId, amount: +monthlyDonation * 100
      }, {
        headers: {token: jwToken}
      })
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    }
  }

  checkEmail() {
    if (this.state.email) {
      axios.get(`${ROOT_URL}/api/users?email=${this.state.email}`)
      .then(response => {
        if (response.data.id && response.data.stripeCustomerId) {
          this.setState({ checkEmailReturned: true, userExists: true, stripeCustomerExists: true })
        } else if (response.data.id) {
          this.setState({ checkEmailReturned: true, userExists: true, stripeCustomerExists: false })
        } else {
          this.setState({ checkEmailReturned: true, userExists: false, stripeCustomerExists: false })
        }
      })
      .catch(console.error)
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleDonationAmount(event) {
    const { name, value } = event.target
    if (name === 'monthlyDonation') {
      this.setState({
        [name]: value,
        singleDonation: ''
      })
    }
    if (name === 'singleDonation') {
      this.setState({
        [name]: value,
        monthlyDonation: ''
      })
    }
  }

  render() {
    return (
      <div className="vw90 displayFlex flexJustifyCenter">
        <form onSubmit={this.handleSubmit} className="stripeForm">
          <FormSupportSection
            singleDonation={this.state.singleDonation}
            monthlyDonation={this.state.monthlyDonation}
            handleDonationAmount={this.handleDonationAmount} />
          <FormPaymentSection
            city={this.state.city}
            state={this.state.state}
            email={this.state.email}
            address={this.state.address}
            checkEmail={this.checkEmail}
            lastName={this.state.lastName}
            password={this.state.password}
            firstName={this.state.firstName}
            userExists={this.state.userExists}
            handleInputChange={this.handleInputChange}
            checkEmailReturned={this.state.checkEmailReturned}
            stripeCustomerExists={this.state.stripeCustomerExists} />
          <div className="stripeCardElementDiv">
            <CardElement
              style={{base: {
                fontFamily: 'raleway',
                fontSize: '16px',
                '::placeholder': {
                  color: 'rgba(85, 85, 85, 0.5)'
                }
              }}}
              onChange={event => this.setState({zip: event.value.postalCode})}
              className="stripeCardElement" />
          </div>
          <FormReviewSection
            isLoading={this.state.isLoading}
            singleDonation={this.state.singleDonation}
            monthlyDonation={this.state.monthlyDonation} />
        </form>
      </div>
    )
  }
}

export default injectStripe(StripeForm)
