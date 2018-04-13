import React from 'react'
import { FooterPresenter, StripeFormContainer } from '../'
import { Elements } from 'react-stripe-elements'

const DonorSignupPresenter = props => (
  <div className="donorSignupBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAlignCenter">
      <p className="mobileHeader">DONOR SIGNUP</p>
      <Elements fonts={[{
        cssSrc: 'https://fonts.googleapis.com/css?family=Raleway' }]}>
        <StripeFormContainer {...props} />
      </Elements>
    </div>
    <FooterPresenter />
  </div>
)

export default DonorSignupPresenter
