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
      failed: false,
    }
    this.verifyUser = this.verifyUser.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.handleError = this.handleError.bind(this)
    this.setInputRef = this.setInputRef.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
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
      console.log('Error: ', error.message)
      this.handleError()
    } else {
      const { userExists, stripeCustomerExists } = this.state
      if (!userExists) {
        this.createCustomer(token)
        .then(customer => this.createUserWithCustomerId(customer.data))
        .then(verifiedResult => this.subscribeOrCharge(verifiedResult))
        .catch(err => {
          console.log('Error: ', err)
          this.handleError()
        })
      } else if (userExists && !stripeCustomerExists) {
        this.createCustomer(token)
        .then(customer => this.verifyUser(customer.data))
        .then(verifiedResult => {
          this.updateUserWithCustomerId(verifiedResult)
          return this.subscribeOrCharge(verifiedResult)
        })
        .catch(err => {
          console.log('Error: ', err)
          this.handleError()
        })
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
    .catch(err => {
      console.log('Error: ', err)
    })
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
      .catch(err => {
        console.log('Error: ', err)
        this.handleError()
      })
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
      .catch(err => {
        console.log('Error: ', err)
        this.handleError()
      })
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

  setInputRef(name, ref) {
    this[name] = ref
  }

  handleKeyDown(event, name) {
    console.log('event: ', event)
    console.log('name: ', name)
    if (event.keyCode === 13) {
      console.log('this[name]: ', this[name])
      this[name].focus()
    }
  }

  handleError() {
    this.setState({
      failed: true,
      isLoading: false,
    })
    setTimeout(() => this.setState({failed: false}), 10000)
  }

  render() {
    return (
      <StripeFormPresenter
        zip={this.state.zip}
        city={this.state.city}
        state={this.state.state}
        email={this.state.email}
        failed={this.state.failed}
        checkEmail={this.checkEmail}
        address={this.state.address}
        password={this.state.password}
        lastName={this.state.lastName}
        setInputRef={this.setInputRef}
        firstName={this.state.firstName}
        isLoading={this.state.isLoading}
        handleSubmit={this.handleSubmit}
        userExists={this.state.userExists}
        handleZipCode={this.handleZipCode}
        handleKeyDown={this.handleKeyDown}
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
