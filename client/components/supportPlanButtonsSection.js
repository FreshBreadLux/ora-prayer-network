import React from 'react'

const SupportPlanButtonsSection = ({ created, toggleCustomInput, customInputRevealed, handleInputChange, updateSubscription, toggleCancelButton, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, toggleStartNewPlan, startNewSubscription, startNewPlanAmount, updatePlanAmount }) => (
  <div className="displayFlex flexColumn flexAlignStart widthPercent65">
    {created === 'CANCELED'
    ? <div>
        <button
          onClick={toggleStartNewPlan}
          className="supportPlanButton">START NEW PLAN</button>
        <div className={startNewPlanRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <input
              name="startNewPlanAmount"
              value={startNewPlanAmount}
              className="donateInputLine"
              onChange={handleInputChange} />
            <button
              onClick={startNewSubscription}
              className="confirmSupportPlanButton">UPDATE</button>
          </div>
        </div>
      </div>
    : <div>
        <button
          onClick={toggleCustomInput}
          className="supportPlanButton">EDIT MONTHLY AMOUNT</button>
        <div className={customInputRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <input
              name="updatePlanAmount"
              value={updatePlanAmount}
              className="donateInputLine"
              onChange={handleInputChange} />
            <button
              onClick={updateSubscription}
              className="confirmSupportPlanButton">UPDATE</button>
          </div>
        </div>
        <button
          onClick={toggleCancelButton}
          className="supportPlanButton">CANCEL SUPPORT PLAN</button>
        <div className={cancelButtonRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p>Are you sure you want to cancel your donation plan?</p>
            <button
              onClick={cancelSubscription}
              className="confirmSupportPlanButton">CANCEL</button>
          </div>
        </div>
      </div>
    }
  </div>
)

export default SupportPlanButtonsSection
