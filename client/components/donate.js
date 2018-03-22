import React from 'react'
import { connect } from 'react-redux'
import Footer from './footer'
import { Elements } from 'react-stripe-elements'
import StripeForm from './stripeForm'

const Donate = () => (
  <div className="displayFlex flexColumn flex1">
    <div className="displayFlex flexColumn flex1 flexAlignCenter">
      <p className="raleway font30 centerText paddingQuarterem">DONATE</p>
      <Elements>
        <StripeForm />
      </Elements>
    </div>
    <Footer />
  </div>
)

export default connect()(Donate)
