import React from 'react'
import { CardElement } from 'react-stripe-elements'
import { FormReviewPresenter, FormPaymentPresenter, FormSupportPresenter } from '../'

const StripeFormPresenter = ({ singleDonation, monthlyDonation, city, state, email, address, lastName, password, firstName, userExists, checkEmailReturned, stripeCustomerExists, isLoading, handleSubmit, handleDonationAmount, handleInputChange, checkEmail, handleZipCode, zip, failed, setInputRef, handleKeyDown }) => (
  <div className="displayFlex flexJustifyCenter">
    <form onSubmit={handleSubmit} className="stripeForm">
      <FormSupportPresenter
        handleKeyDown={handleKeyDown}
        singleDonation={singleDonation}
        monthlyDonation={monthlyDonation}
        handleDonationAmount={handleDonationAmount} />
      <FormPaymentPresenter
        city={city}
        state={state}
        email={email}
        address={address}
        password={password}
        lastName={lastName}
        firstName={firstName}
        checkEmail={checkEmail}
        userExists={userExists}
        setInputRef={setInputRef}
        handleKeyDown={handleKeyDown}
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
          onChange={handleZipCode}
          className="stripeCardElement" />
      </div>
      <FormReviewPresenter
        zip={zip}
        city={city}
        state={state}
        email={email}
        failed={failed}
        address={address}
        password={password}
        lastName={lastName}
        firstName={firstName}
        isLoading={isLoading}
        singleDonation={singleDonation}
        monthlyDonation={monthlyDonation} />
    </form>
  </div>
)

export default StripeFormPresenter
