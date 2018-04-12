import React from 'react'
import { connect } from 'react-redux'

function createDateWithSuffix(billingAnchor) {
  const billingAnchorDate = new Date(billingAnchor * 1000)
  let date = billingAnchorDate.getDate()
  const mod10 = date % 10, mod100 = date % 100
  if (mod10 === 1 && mod100 !== 11) return date + 'st'
  if (mod10 === 2 && mod100 !== 12) return date + 'nd'
  if (mod10 === 3 && mod100 !== 13) return date + 'rd'
  return date + 'th'
}

const SupportPlanDetailPresenter = ({ created, billingCycleAnchor, plan }) => (
  <div className="supportPlanHeaderSection">
    <div className="displayFlex flex3">
      <div className="displayFlex flexColumn">
        <p className="bottomMarginHalfem font16">SUPPORT PLAN</p>
        <p className="font12 bottomMarginHalfem">
          {created === 'CANCELED'
          ? created
          : `STARTED: ${new Date(created * 1000).toDateString().slice(3)
          .toUpperCase()}`}
        </p>
        <p className="font12 bottomMargin1em">
          {created === 'CANCELED'
          ? null
          : `Donation on the ${createDateWithSuffix(billingCycleAnchor)} of the month`}
        </p>
      </div>
    </div>
    <div className="displayFlex flex2 flexJustifyEnd">
      <div className="displayFlex flexColumn">
        <p className="font36">{`$${plan.amount / 100}`}</p>
        <p className="font12 rightText">{`per ${plan.interval}`}</p>
      </div>
    </div>
  </div>
)

const mapState = state => ({
  plan: state.subscriptionInfo.plan,
  created: state.subscriptionInfo.created,
  billingCycleAnchor: state.subscriptionInfo.billing_cycle_anchor,
})

export default connect(mapState)(SupportPlanDetailPresenter)
