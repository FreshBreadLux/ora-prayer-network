import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import axios from 'axios'

class StripeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      otherAmount: '',
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.toggleOneTimeDonation = this.toggleOneTimeDonation.bind(this)
    this.createReviewString = this.createReviewString.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.stripe.createToken()
    .then(({token}) => {
      console.log('Received Stripe token: ', token)
    })
  }

  handleOptionChange(event) {
    this.setState({selectedOption: event.target.value})
  }

  toggleOneTimeDonation() {
    this.setState({oneTimeDonation: !this.state.oneTimeDonation})
  }

  checkEmail() {
    console.log('sending email for verification...')
    axios.get(`https://ora-pro-nobis.herokuapp.com/api/users/byEmail/${this.state.email}`)
    .then(response => {
      console.log('checkEmail response: ', response)
      if (response.data.id) {
        this.setState({
          checkEmailReturned: true,
          userExists: true
        })
      } else {
        this.setState({
          checkEmailReturned: true,
          userExists: false
        })
      }
    })
    .catch(console.error)
  }

  createReviewString() {
    if (this.state.selectedOption === 'OneTime') {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.state.oneTimeAmount} `}
          </p>
          <p className="raleway blackText font16 rightText">
            one-time donation
          </p>
        </div>
      )
    } else if (this.state.selectedOption === 'Other') {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.state.otherAmount} `}
          </p>
          <p className="raleway blackText font16 rightText">
            monthly donation
          </p>
        </div>
      )
    } else if (this.state.selectedOption === '') {
      return ''
    } else {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.state.selectedOption} `}
          </p>
          <p className="raleway blackText font16 rightText">
            monthly donation
          </p>
        </div>
      )
    }
  }

  render() {
    console.log('this.state: ', this.state)
    return (
      <div className="vw90 displayFlex flexJustifyCenter">
        <form onSubmit={this.handleSubmit} className="stripeForm">
          <p className="stripeFormSectionHeader">SUPPORT INFORMATION</p>
          <div className="selectAmountDiv">
            <div className="radioButtonDiv">
              <input
                type="radio"
                id="25"
                value="25"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === '25'} />
              <label htmlFor="25">
                <span />$25 per month</label>
            </div>
            <div className="radioButtonDiv">
              <input
                type="radio"
                id="50"
                value="50"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === '50'} />
              <label htmlFor="50">
                <span />$50 per month</label>
            </div>
            <div className="radioButtonDiv">
              <input
                type="radio"
                id="100"
                value="100"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === '100'} />
              <label htmlFor="100">
                <span />$100 per month</label>
            </div>
            <div className="radioButtonDiv">
              <input
                type="radio"
                id="Other"
                value="Other"
                onChange={this.handleOptionChange}
                checked={this.state.selectedOption === 'Other'} />
              <label htmlFor="Other">
                <span />Other monthly amount</label>
            </div>
            <div className={this.state.selectedOption === 'Other'
              ? 'revealedCustomAmountDiv' : 'hiddenCustomAmountDiv'}>
              <input
                type="text"
                inputMode="text"
                onChange={event => this.setState({otherAmount: event.target.value})}
                className="donateInputLine widthPercent100"
                placeholder="Custom Amount" />
            </div>
            <a href="#" onClick={this.toggleOneTimeDonation} className="whatAboutOneTime">What about one-time donations?</a>
            <div className={this.state.oneTimeDonation ? 'showOneTimeDonationDiv' : 'hideOneTimeDonationDiv'}>
              <p className="oneTimeDonationBlurb">We prefer recurring donations because we want to build relationships with our Angel Investors. However, if you'd like to make a one-time donation you can use the option below.</p>
              <div className="radioButtonDiv">
                <input
                  type="radio"
                  id="OneTime"
                  value="OneTime"
                  onChange={this.handleOptionChange}
                  checked={this.state.selectedOption === 'OneTime'} />
                <label id="OneTimeLabel" htmlFor="OneTime">
                  <span />One-time donation</label>
              </div>
              <div className={this.state.selectedOption === 'OneTime'
                ? 'revealedOneTimeCustomAmountDiv' : 'hiddenOneTimeCustomAmountDiv'}>
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({oneTimeAmount: event.target.value})}
                  className="oneTimeAmount widthPercent100"
                  placeholder="One-Time Amount" />
              </div>
            </div>
          </div>
          <p className="stripeFormSectionHeader">PAYMENT INFORMATION</p>
          <div className="paymentInfoDiv">
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">NAME</label>
              <div className="displayFlex flexJustifyCenter">
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({firstName: event.target.value})}
                  className="donateInputLine widthPercent50"
                  placeholder="First Name" />
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({lastName: event.target.value})}
                  className="donateInputLine widthPercent50"
                  placeholder="Last Name" />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">EMAIL</label>
              <div className="displayFlex">
                <input
                  type="email"
                  inputMode="email"
                  onChange={event => this.setState({email: event.target.value})}
                  onBlur={this.checkEmail}
                  className="donateInputLine widthPercent100"
                  placeholder="Email" />
              </div>
            </div>
            <div className={this.state.checkEmailReturned && this.state.userExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
              <p className="raleway greenText font10 bottomMargin1em">VERIFIED! YOU'LL USE THE SAME PASSWORD YOU USE FOR THE APP TO MANAGE YOUR DONATIONS</p>
            </div>
            <div className={this.state.checkEmailReturned && !this.state.userExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
              <p className="raleway greyText font10">WELCOME! YOU'LL NEED TO SET A PASSWORD TO USE IN THE ORA APP AND TO MANAGE YOUR DONATIONS</p>
              <input
                type="text"
                inputMode="text"
                autoFocus={true}
                onChange={event => this.setState({password: event.target.value})}
                className="donateInputLine widthPercent100 bottomMargin1em"
                placeholder="Password" />
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">ADDRESS</label>
              <div className="displayFlex">
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({address: event.target.value})}
                  className="donateInputLine widthPercent100"
                  placeholder="Address" />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">CITY | STATE</label>
              <div className="displayFlex flexJustifyCenter">
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({city: event.target.value})}
                  className="donateInputLine widthPercent50"
                  placeholder="City" />
                <input
                  type="text"
                  inputMode="text"
                  onChange={event => this.setState({state: event.target.value})}
                  className="donateInputLine widthPercent50"
                  placeholder="State" />
              </div>
            </div>
            <label className="raleway greyText font12">CARD INFORMATION</label>
            <CardElement
              onChange={event => this.setState({zip: event.value.postalCode})}
              className="stripeCardElement" />
          </div>
          <p className="stripeFormSectionHeader">REVIEW</p>
          <div className="reviewDiv blueBottomBorder bottomMargin1em">
            <p className="raleway blackText font12 bottomMargin1em">ANGEL INVESTOR STATUS</p>
            {this.createReviewString()}
          </div>
          <div className="displayFlex flexJustifyCenter">
            <button className="supportFormButton" type="submit">DONATE</button>
          </div>
        </form>
      </div>
    )
  }
}

export default injectStripe(StripeForm)
