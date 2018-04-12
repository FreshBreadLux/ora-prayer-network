import React from 'react'
import { connect } from 'react-redux'

const SupportPlanHeaderPresenter = ({ userName, investmentTotal }) => (
  <div>
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font24">{`${userName.first} ${userName.last}`}</p>
      <p className="raleway font30">{`$${investmentTotal / 100}`}</p>
    </div>
    <div className="displayFlex flexJustifyBetween flexAlignEnd bottomMarginHalfem">
      <p className="raleway font20">ANGEL INVESTOR</p>
      <p className="raleway font12 rightText">INVESTMENT<br />TOTAL</p>
    </div>
  </div>
)

const mapState = state => ({
  userName: state.userInfo.userName,
  investmentTotal: state.userInfo.investmentTotal,
})

export default connect(mapState)(SupportPlanHeaderPresenter)
