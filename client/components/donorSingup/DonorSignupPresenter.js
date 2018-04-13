import React from 'react'
import Footer from '../Footer'
import { Elements } from 'react-stripe-elements'
import StripeForm from './stripeForm'

const DonorSignupPresenter = props => (
  <div className="donorSignupBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAlignCenter">
      <p className="mobileHeader">DONOR SIGNUP</p>
      <Elements fonts={[{
        cssSrc: 'https://fonts.googleapis.com/css?family=Raleway' }]}>
        <StripeForm {...props} />
      </Elements>
    </div>
    <Footer />
  </div>
)

export default DonorSignupPresenter
