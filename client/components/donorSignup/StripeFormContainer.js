import React from 'react'
import axios from 'axios'
import { injectStripe } from 'react-stripe-elements'
import StripeFormPresenter from './StripeFormPresenter'
import { ROOT_URL, SENDINBLUE_API_KEY_V3 } from '../../config'

const STATES = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']

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
      stateError: false,
    }
    this.verifyUser = this.verifyUser.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.verifyState = this.verifyState.bind(this)
    this.setInputRef = this.setInputRef.bind(this)
    this.handleError = this.handleError.bind(this)
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
        console.log('A donor without an app profile is signing up!')
        this.createCustomer(token)
        .then(customer => {
          console.log('customer.data:', customer.data)
          return this.createUserWithCustomerId(customer.data)
        })
        .then(verifiedResult => this.subscribeOrCharge(verifiedResult))
        .catch(err => {
          console.log('Error: ', err)
          this.handleError()
        })
      } else if (userExists && !stripeCustomerExists) {
        console.log('An app user is signing up as a donor!')
        this.createCustomer(token)
        .then(customer => {
          console.log('Verifying Customer...', customer.data)
          return this.verifyUser(customer.data)
        })
        .then(async (verifiedResult) => {
          console.log('Verified Result:', verifiedResult)
          await this.updateUserWithCustomerId(verifiedResult)
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
    console.log('customer argument in createUserWithCustomerId:', customer)
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
    console.log('Posting to sessions with email:', email)
    console.log('Password boolean:', !!password)
    return axios.post(`${ROOT_URL}/api/users/sessions`, { email, password })
    .then(userIdAndJwt => {
      console.log('Returning userId and JWT:', userIdAndJwt.data)
      return { userIdAndJwt: userIdAndJwt.data, customer }
    })
  }

  updateUserWithCustomerId(verifiedResult) {
    const { userIdAndJwt, customer } = verifiedResult
    const { firstName, lastName, address, city, state, zip } = this.state
    return axios.put(`${ROOT_URL}/api/users/${userIdAndJwt.userId}`, {
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

  setInputRef(ref, name) {
    this[name] = ref
  }

  handleKeyDown(event, name) {
    if (event.keyCode === 13) this[name].focus()
  }

  handleError() {
    this.setState({
      failed: true,
      isLoading: false,
    })
    setTimeout(() => this.setState({failed: false}), 10000)
  }

  verifyState() {
    if (STATES.indexOf(this.state.state.toUpperCase()) === -1) {
      this.setState({ stateError: true })
      this.stateRef.select()
    } else {
      this.setState({ stateError: false })
    }
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
        verifyState={this.verifyState}
        password={this.state.password}
        lastName={this.state.lastName}
        setInputRef={this.setInputRef}
        firstName={this.state.firstName}
        isLoading={this.state.isLoading}
        handleSubmit={this.handleSubmit}
        stateError={this.state.stateError}
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
