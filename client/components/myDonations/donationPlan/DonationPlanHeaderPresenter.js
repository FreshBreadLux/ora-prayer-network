import React from 'react'
import { connect } from 'react-redux'

const DonationPlanHeaderPresenter = ({ userName, investmentTotal, angelInvestor }) => (
  <div className="donationPlanHeader">
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font24 blackText">{`${userName.first} ${userName.last}`}</p>
      <p className="raleway font30 blackText">{`$${investmentTotal / 100}`}</p>
    </div>
    <div className="displayFlex flexJustifyBetween flexAlignEnd bottomMarginHalfem">
      <p className="raleway font20 blackText">{angelInvestor ? 'ANGEL INVESTOR' : 'DONOR'}</p>
      <p className="raleway font12 rightText blackText">INVESTMENT<br />TOTAL</p>
    </div>
  </div>
)

const mapState = state => ({
  userName: state.userInfo.userName,
  investmentTotal: state.userInfo.investmentTotal,
  angelInvestor: !!state.subscriptionInfo.plan.amount,
})

export default connect(mapState)(DonationPlanHeaderPresenter)
