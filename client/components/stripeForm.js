import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'

class StripeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
      customAmount: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
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
                <span />Other Monthly Amount</label>
            </div>
            <div className={this.state.selectedOption === 'Other'
              ? 'revealedCustomAmountDiv' : 'hiddenCustomAmountDiv'}>
              <input className="raleway blackText font16" placeholder="Custom Amount" />
            </div>
          </div>
          <CardElement className="stripeCardElement" />
        </form>
      </div>
    )
  }
}

export default injectStripe(StripeForm)
