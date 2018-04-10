import React from 'react'
import ReactEmoji from 'react-emoji'
const Io = require('react-icons/lib/io')
import SupportPlanOptionsSection from './supportPlanOptionsSection'

function createDateWithSuffix(billingAnchor) {
  const billingAnchorDate = new Date(billingAnchor * 1000)
  let date = billingAnchorDate.getDate()
  const mod10 = date % 10, mod100 = date % 100
  if (mod10 === 1 && mod100 !== 11) return date + 'st'
  if (mod10 === 2 && mod100 !== 12) return date + 'nd'
  if (mod10 === 3 && mod100 !== 13) return date + 'rd'
  return date + 'th'
}

const SupportPlanPresenter = ({ isLoading, investmentTotal, userName, created, handleInputChange, updateSubscription, cancelSubscription, startNewPlanRevealed, startNewSubscription, customInputRevealed, cancelButtonRevealed, plan, startNewPlanAmount, updatePlanAmount, toggleStateField, changeBillingRevealed, donationDate, billingCycleAnchor, changeBillingDate }) => (
  <div>
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font24">{`${userName.first} ${userName.last}`}</p>
      <p className="raleway font30">{`$${investmentTotal / 100}`}</p>
    </div>
    <div className="displayFlex flexJustifyBetween flexAlignEnd bottomMarginHalfem">
      <p className="raleway font20">ANGEL INVESTOR</p>
      <p className="raleway font12 rightText">INVESTMENT<br />TOTAL</p>
    </div>
    <div className="supportPlanDiv">
      <div className="displayFlex bottomMargin1em">
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
      <p className="supportPlanOptionsHeader">OPTIONS</p>
      <SupportPlanOptionsSection
        created={created}
        isLoading={isLoading}
        donationDate={donationDate}
        updatePlanAmount={updatePlanAmount}
        toggleStateField={toggleStateField}
        changeBillingDate={changeBillingDate}
        handleInputChange={handleInputChange}
        updateSubscription={updateSubscription}
        cancelSubscription={cancelSubscription}
        startNewPlanAmount={startNewPlanAmount}
        customInputRevealed={customInputRevealed}
        startNewPlanRevealed={startNewPlanRevealed}
        startNewSubscription={startNewSubscription}
        cancelButtonRevealed={cancelButtonRevealed}
        changeBillingRevealed={changeBillingRevealed} />
    </div>
  </div>
)

export default SupportPlanPresenter
