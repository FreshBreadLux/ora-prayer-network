import React from 'react'
import ReactEmoji from 'react-emoji'

const SupportPlanButtonsSection = ({ created, toggleCustomInput, customInputRevealed, handleInputChange, updateSubscription, toggleCancelButton, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, toggleStartNewPlan, startNewSubscription, startNewPlanAmount, updatePlanAmount }) => (
  <div className="displayFlex flexColumn widthPercent65 flexAllCenter">
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
              className="supportPlanUpdateButton">
              <span className="emojiSpan">
              {ReactEmoji.emojify(':tada:', {attributes: {width: '18px', height: '18px', className: 'rightMarginHalfem'}})}{`UPDATE`}
              </span>
            </button>
          </div>
        </div>
      </div>
    : <div>
        <button
          onClick={toggleCustomInput}
          className="supportPlanButton bottomMarginHalfem">EDIT MONTHLY AMOUNT</button>
        <div className={customInputRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p className="font12">This will cancel your current plan and start a new one, with an immediate charge</p>
            <input
              name="updatePlanAmount"
              value={updatePlanAmount}
              className="donateInputLine"
              onChange={handleInputChange} />
            <button
              onClick={updateSubscription}
              className="supportPlanUpdateButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':heavy_check_mark:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`UPDATE`}
              </span>
            </button>
          </div>
        </div>
        <button
          onClick={toggleCancelButton}
          className="supportPlanButton">CANCEL SUPPORT PLAN</button>
        <div className={cancelButtonRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p className="font12">Are you sure you want to cancel your donation plan?</p>
            <button
              onClick={cancelSubscription}
              className="supportPlanCancelButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':x:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`CANCEL`}
              </span>
            </button>
          </div>
        </div>
      </div>
    }
  </div>
)

export default SupportPlanButtonsSection
