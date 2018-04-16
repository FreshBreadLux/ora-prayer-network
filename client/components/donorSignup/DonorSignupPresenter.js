import React from 'react'
import { FooterPresenter, StripeFormContainer } from '../'
import { Elements } from 'react-stripe-elements'

const DonorSignupPresenter = props => (
  <div className="donorSignupBackgroundImage">
    <div className="displayFlex flexColumn flex1">
      <p className="mobileHeader">DONOR SIGNUP</p>
      <div className="donorWebHeader">
        <p className="donorWebHeaderTitle">WE'RE GOING TO MAKE<br />A GREAT TEAM</p>
        <p className="donorWebHeaderSubTitle">We value and trust our community, and turn to you for prayer, support, and guidance</p>
      </div>
      <Elements fonts={[{
        cssSrc: 'https://fonts.googleapis.com/css?family=Raleway' }]}>
        <StripeFormContainer {...props} />
      </Elements>
    </div>
    <FooterPresenter />
  </div>
)

export default DonorSignupPresenter
