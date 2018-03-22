import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'

class StripeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      customAmount: false,
      oneTimeDonation: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.toggleOneTimeDonation = this.toggleOneTimeDonation.bind(this)
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

  render() {
    return (
      <div className="vw90">
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
              <input className="donateInputLine  widthPercent100" placeholder="Custom Amount" />
            </div>
            <a href="#" onClick={this.toggleOneTimeDonation} className="whatAboutOneTime">What about one-time donations?</a>
            <div className={this.state.oneTimeDonation ? 'showOneTimeDonationDiv' : 'hideOneTimeDonationDiv'}>
              <p className="oneTimeDonationBlurb">We prefer recurring donations because we view Angel Investors as true partners; we'll meet with you, keep you up-to-date, and ask for your advice and input. We want you to be part of our team, and with that in mind we prefer to build relationships over time. However, if you'd like to make a one-time donation you can use the option below.</p>
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
                <input className="raleway blackText font12 blueBottomBorder widthPercent100" placeholder="One-Time Amount" />
              </div>
            </div>
          </div>
          <p className="stripeFormSectionHeader">PAYMENT INFORMATION</p>
          <div className="paymentInfoDiv">
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">NAME</label>
              <div className="displayFlex flexJustifyCenter">
                <input className="donateInputLine widthPercent50" placeholder="First Name" />
                <input className="donateInputLine widthPercent50" placeholder="Last Name" />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">EMAIL</label>
              <div className="displayFlex">
                <input className="donateInputLine widthPercent100" placeholder="Email" />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">ADDRESS</label>
              <div className="displayFlex">
                <input className="donateInputLine widthPercent100" placeholder="Address" />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway greyText font12">CITY | STATE | ZIP</label>
              <div className="displayFlex flexJustifyCenter">
                <input className="donateInputLine widthPercent33" placeholder="City" />
                <input className="donateInputLine widthPercent33" placeholder="State" />
                <input className="donateInputLine widthPercent33" placeholder="Zip" />
              </div>
            </div>
            <label className="raleway greyText font12">CARD INFORMATION</label>
            <CardElement className="stripeCardElement" />
          </div>
          <p className="stripeFormSectionHeader">REVIEW</p>
          <div className="reviewDiv">
            <p className="raleway blackText font16">AMOUNT</p>
          </div>
        </form>
      </div>
    )
  }
}

export default injectStripe(StripeForm)