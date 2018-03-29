import React from 'react'
import SupportPlanButtonsSection from './supportPlanButtonsSection'

const ManageMyDonationsPresenter = ({ plan, created, logout, toggleCustomInput, customInputRevealed, handleInputChange, updateSubscription, toggleCancelButton, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, toggleStartNewPlan, startNewSubscription, charges }) => (
  <div className="displayFlex flexColumn flex1 padding1em">
    <p className="raleway font24 bottomMarginHalfem">ANGEL INVESTOR</p>
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
          startNewSubscription={startNewSubscription}
          customInputRevealed={customInputRevealed}
          cancelButtonRevealed={cancelButtonRevealed} />
        <div className="displayFlex flexColumn flexAlignCenter alignSelfEnd widthPercent35">
          <p className="font30">{`$${plan.amount / 100}`}</p>
          <p className="font12">{`per ${plan.interval}`}</p>
        </div>
      </div>
    </div>
    <p className="raleway font24 bottomMarginHalfem topMargin1em">HISTORY</p>
    {charges.map(charge => (
      <div
        key={charge.id}
        className="supportPlanDiv bottomMarginHalfem">
        <p>{`Donation amount: $${charge.amount / 100}`}</p>
        <p>{`Date: ${new Date(charge.created * 1000).toDateString().slice(3)
          .toUpperCase()}`}</p>
      </div>
    ))}
    <button onClick={logout}>LOGOUT</button>
  </div>
)

export default ManageMyDonationsPresenter
