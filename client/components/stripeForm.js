import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import FormSupportSection from './formSupportSection'
import FormPaymentSection from './formPaymentSection'
import FormReviewSection from './formReviewSection'
import axios from 'axios'

class StripeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      customAmount: '',
      oneTimeDonation: false,
      oneTimeAmount: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      checkEmailReturned: false,
      userExists: false,
      address: '',
      city: '',
      state: '',
      zip: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleOneTimeDonation = this.toggleOneTimeDonation.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.setAddressFieldRef = this.setAddressFieldRef.bind(this)
    this.setPasswordFieldRef = this.setPasswordFieldRef.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {token, error} = await this.props.stripe.createToken()
    if (error) {
      console.error('Error: ', error.message)
    } else {
      console.log('token: ', token)
      axios.post(`https://ora-pro-nobis.herokuapp.com/api/donations/oneTime`, {
        token: token
      })
      .then(charge => console.log('Charge confirmed: ', charge))
      .catch(console.error)
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  toggleOneTimeDonation() {
    this.setState({oneTimeDonation: !this.state.oneTimeDonation})
  }

  checkEmail() {
    axios.get(`https://ora-pro-nobis.herokuapp.com/api/users/byEmail/${this.state.email}`)
    .then(response => {
      if (response.data.id) {
        this.setState({
          checkEmailReturned: true,
          userExists: true
        })
        this.addressField.focus()
      } else {
        this.setState({
          checkEmailReturned: true,
          userExists: false
        })
        this.passwordField.focus()
      }
    })
    .catch(console.error)
  }

  setAddressFieldRef(ref) {
    this.addressField = ref
  }

  setPasswordFieldRef(ref) {
    this.passwordField = ref
  }

  render() {
    console.log('this.state: ', this.state)
    return (
      <div className="vw90 displayFlex flexJustifyCenter">
        <form onSubmit={this.handleSubmit} className="stripeForm">
          <FormSupportSection
            handleInputChange={this.handleInputChange}
            selectedOption={this.state.selectedOption}
            oneTimeDonation={this.state.oneTimeDonation}
            toggleOneTimeDonation={this.toggleOneTimeDonation} />
          <FormPaymentSection
            checkEmail={this.checkEmail}
            userExists={this.state.userExists}
            handleInputChange={this.handleInputChange}
            setAddressFieldRef={this.setAddressFieldRef}
            setPasswordFieldRef={this.setPasswordFieldRef}
            checkEmailReturned={this.state.checkEmailReturned} />
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
