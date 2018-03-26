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
      selectedOption: '',
      customAmount: '',
      oneTimeDonationDivOpen: false,
      oneTimeAmount: '',
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
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleOneTimeDonationDivOpen = this.toggleOneTimeDonationDivOpen.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.setAddressFieldRef = this.setAddressFieldRef.bind(this)
    this.setPasswordFieldRef = this.setPasswordFieldRef.bind(this)
    this.createUserWithStripeCustomerID = this.createUserWithStripeCustomerID.bind(this)
    this.createStripeCustomer = this.createStripeCustomer.bind(this)
    this.subscribeOrCharge = this.subscribeOrCharge.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { token, error } = await this.props.stripe.createToken()
    if (error) {
      console.error('Error: ', error.message)
    } else {
      console.log('token: ', token)
      const { userExists, stripeCustomerExists } = this.state
      if (!userExists) this.createUserWithStripeCustomerID(token)
      else if (userExists && !stripeCustomerExists) this.createStripeCustomer(token)
    }
  }

  createUserWithStripeCustomerID(token) {
    const { firstName, lastName, email, password, address, city, state, zip } = this.state
    axios.post(`${ROOT_URL}/api/users/donor`, {
      token,
      userInfo: { firstName, lastName, email, password, address, city, state, zip }
    })
    .then(createdUser => this.subscribeOrCharge(createdUser))
    .catch(console.error)
  }

  createStripeCustomer(token) {
    const { firstName, lastName, email, password, address, city, state, zip } = this.state
    axios.post(`${ROOT_URL}/api/users/stripeCustomer`, {
      token,
      userInfo: { firstName, lastName, email, password, address, city, state, zip }
    })
    .then(updatedUser => this.subscribeOrCharge(updatedUser))
    .catch(console.error)
  }

  subscribeOrCharge(user) {
    const { selectedOption } = this.state
    const oneTimeAmount = +this.state.oneTimeAmount * 100
    const customAmount = +this.state.customAmount * 100
    if (selectedOption === 'OneTime') {
      axios.post(`${ROOT_URL}/api/donations/oneTime`, { user, oneTimeAmount })
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    } else if (selectedOption === 'Custom') {
      axios.post(`${ROOT_URL}/api/donations/customSubscription`, { user, customAmount })
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    } else {
      axios.post(`${ROOT_URL}/api/donations/existingSubscription`, { user, selectedOption })
      .then(() => this.props.history.push('/thank-you'))
      .catch(console.error)
    }
  }

  checkEmail() {
    axios.get(`${ROOT_URL}/api/users/byEmail/${this.state.email}`)
    .then(response => {
      if (response.data.id && response.data.stripeCustomerId) {
        this.setState({ checkEmailReturned: true, userExists: true, stripeCustomerExists: true })
      } else if (response.data.id) {
        this.setState({ checkEmailReturned: true, userExists: true })
        this.addressField.focus()
      } else {
        this.setState({ checkEmailReturned: true, userExists: false })
        this.passwordField.focus()
      }
    })
    .catch(console.error)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  toggleOneTimeDonationDivOpen() {
    this.setState({oneTimeDonationDivOpen: !this.state.oneTimeDonationDivOpen})
  }

  setAddressFieldRef(ref) {
    this.addressField = ref
  }

  setPasswordFieldRef(ref) {
    this.passwordField = ref
  }

  render() {
    return (
      <div className="vw90 displayFlex flexJustifyCenter">
        <form onSubmit={this.handleSubmit} className="stripeForm">
          <FormSupportSection
            handleInputChange={this.handleInputChange}
            selectedOption={this.state.selectedOption}
            oneTimeDonationDivOpen={this.state.oneTimeDonationDivOpen}
            toggleOneTimeDonationDivOpen={this.toggleOneTimeDonationDivOpen} />
          <FormPaymentSection
            checkEmail={this.checkEmail}
            userExists={this.state.userExists}
            handleInputChange={this.handleInputChange}
            setAddressFieldRef={this.setAddressFieldRef}
            setPasswordFieldRef={this.setPasswordFieldRef}
            checkEmailReturned={this.state.checkEmailReturned}
            stripeCustomerExists={this.state.stripeCustomerExists} />
          <div className="paddingHalfem bottomMargin1em">
            <label className="raleway greyText font12">CARD INFORMATION</label>
            <CardElement
              onChange={event => this.setState({zip: event.value.postalCode})}
              className="stripeCardElement" />
          </div>
          <FormReviewSection
            customAmount={this.state.customAmount}
            oneTimeAmount={this.state.oneTimeAmount}
            selectedOption={this.state.selectedOption} />
        </form>
      </div>
    )
  }
}

export default injectStripe(StripeForm)
