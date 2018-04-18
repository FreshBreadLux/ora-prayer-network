import React from 'react'
import axios from 'axios'
import { injectStripe } from 'react-stripe-elements'
import StripeFormPresenter from './StripeFormPresenter'
import { ROOT_URL, SENDINBLUE_API_KEY_V3 } from '../../config'

class StripeFormContainer extends React.Component {
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
    this.verifyUser = this.verifyUser.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleZipCode = this.handleZipCode.bind(this)
    this.createCustomer = this.createCustomer.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.subscribeOrCharge = this.subscribeOrCharge.bind(this)
    this.handleDonationAmount = this.handleDonationAmount.bind(this)
    this.createUserWithCustomerId = this.createUserWithCustomerId.bind(this)
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
    const { monthlyDonation, singleDonation, email, firstName, lastName } = this.state
    if (singleDonation.length) {
      return Promise.all([
        axios.post(`${ROOT_URL}/api/donations/charges`, {
          userId, amount: +singleDonation * 100
        }, {
          headers: {token: jwToken}
        }),
        axios.post('https://api.sendinblue.com/v3/smtp/templates/3/send', {
          emailTo: [email],
          attributes: { FIRSTNAME: firstName }
        }, {
          headers: {'api-key': SENDINBLUE_API_KEY_V3 }
        }),
        axios.post('https://api.sendinblue.com/v3/contacts', {
          email: email,
          attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
          updateEnabled: true
        }, {
          headers: {'api-key': SENDINBLUE_API_KEY_V3 }
        })
      ])
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    } else {
      return Promise.all([
        axios.post(`${ROOT_URL}/api/donations/subscriptions`, {
          userId, amount: +monthlyDonation * 100
        }, {
          headers: {token: jwToken}
        }),
        axios.post('https://api.sendinblue.com/v3/smtp/templates/3/send', {
          emailTo: [email],
          attributes: { FIRSTNAME: firstName }
        }, {
          headers: {'api-key': SENDINBLUE_API_KEY_V3 }
        }),
        axios.post('https://api.sendinblue.com/v3/contacts', {
          email: email,
          attributes: { FIRSTNAME: firstName, LASTNAME: lastName },
          updateEnabled: true
        }, {
          headers: {'api-key': SENDINBLUE_API_KEY_V3 }
        })
      ])
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

  handleZipCode(event) {
    this.setState({ zip: event.value.postalCode })
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
      <StripeFormPresenter
        city={this.state.city}
        state={this.state.state}
        email={this.state.email}
        checkEmail={this.checkEmail}
        address={this.state.address}
        password={this.state.password}
        lastName={this.state.lastName}
        firstName={this.state.firstName}
        isLoading={this.state.isLoading}
        handleSubmit={this.handleSubmit}
        userExists={this.state.userExists}
        handleZipCode={this.handleZipCode}
        handleInputChange={this.handleInputChange}
        singleDonation={this.state.singleDonation}
        monthlyDonation={this.state.monthlyDonation}
        handleDonationAmount={this.handleDonationAmount}
        checkEmailReturned={this.state.checkEmailReturned}
        stripeCustomerExists={this.state.stripeCustomerExists} />
    )
  }
}

export default injectStripe(StripeFormContainer)
