import React from 'react'
import { CardElement } from 'react-stripe-elements'
import { FormReviewPresenter, FormPaymentPresenter, FormSupportPresenter } from '../'

const StripeFormPresenter = ({ singleDonation, monthlyDonation, city, state, email, address, lastName, password, firstName, userExists, checkEmailReturned, stripeCustomerExists, isLoading, handleSubmit, handleDonationAmount, handleInputChange, checkEmail }) => (
  <div className="vw90 displayFlex flexJustifyCenter">
    <form onSubmit={handleSubmit} className="stripeForm">
      <FormSupportPresenter
        singleDonation={singleDonation}
        monthlyDonation={monthlyDonation}
        handleDonationAmount={handleDonationAmount} />
      <FormPaymentPresenter
        city={city}
        state={state}
        email={email}
        address={address}
        checkEmail={checkEmail}
        lastName={lastName}
        password={password}
        firstName={firstName}
        userExists={userExists}
        handleInputChange={handleInputChange}
        checkEmailReturned={checkEmailReturned}
        stripeCustomerExists={stripeCustomerExists} />
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
      <FormReviewPresenter
        email={email}
        isLoading={isLoading}
        singleDonation={singleDonation}
        monthlyDonation={monthlyDonation} />
    </form>
  </div>
)

export default StripeFormPresenter
