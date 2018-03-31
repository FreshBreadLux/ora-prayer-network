import React from 'react'
import SupportPlanButtonsSection from './supportPlanButtonsSection'

const SupportPlanPresenter = ({ charges, userName, created, toggleCustomInput, handleInputChange, updateSubscription, toggleCancelButton, cancelSubscription, toggleStartNewPlan, startNewPlanRevealed, startNewSubscription, customInputRevealed, cancelButtonRevealed, plan, startNewPlanAmount, updatePlanAmount }) => (
  <div>
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font24">{`${userName.first} ${userName.last}`}</p>
      <p className="raleway font30">{`$${charges.reduce((acc, cur) => acc + cur.amount, 0) / 100}`}</p>
    </div>
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font20">ANGEL INVESTOR</p>
      <p className="raleway font12 rightText">INVESTMENT<br />TOTAL</p>
    </div>
    <div className="supportPlanDiv">
      <p className="bottomMarginHalfem">SUPPORT PLAN</p>
      <p className="font12 bottomMargin3em">
        {created === 'CANCELED'
        ? created
        : `STARTED: ${new Date(created * 1000).toDateString().slice(3)
        .toUpperCase()}`}
      </p>
      <div className="displayFlex flexJustifyBetween">
        <SupportPlanButtonsSection
          created={created}
          toggleCustomInput={toggleCustomInput}
          handleInputChange={handleInputChange}
          updateSubscription={updateSubscription}
          toggleCancelButton={toggleCancelButton}
          cancelSubscription={cancelSubscription}
          toggleStartNewPlan={toggleStartNewPlan}
          startNewPlanRevealed={startNewPlanRevealed}
          startNewPlanAmount={startNewPlanAmount}
          updatePlanAmount={updatePlanAmount}
          startNewSubscription={startNewSubscription}
          customInputRevealed={customInputRevealed}
          cancelButtonRevealed={cancelButtonRevealed} />
        <div className="displayFlex flexColumn flexAlignCenter alignSelfEnd widthPercent35">
          <p className="font30">{`$${plan.amount / 100}`}</p>
          <p className="font12">{`per ${plan.interval}`}</p>
        </div>
      </div>
    </div>
  </div>
)

export default SupportPlanPresenter
