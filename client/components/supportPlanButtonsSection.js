import React from 'react'
import ReactEmoji from 'react-emoji'
import LoadingButtonPresenter from './loadingButtonPresenter'

const SupportPlanButtonsSection = ({ isLoading, toggleStateField, created, customInputRevealed, handleInputChange, updateSubscription, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, startNewSubscription, startNewPlanAmount, updatePlanAmount, changeBillingRevealed, selectedBillingOption, changeBillingDate }) => (
  <div className="displayFlex flexColumn widthPercent65 flexAllCenter">
    {created === 'CANCELED'
    ? <div>
        <button
          onClick={() => toggleStateField('startNewPlanRevealed')}
          className="supportPlanButton">START NEW PLAN</button>
        <div className={startNewPlanRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <input
              name="startNewPlanAmount"
              value={startNewPlanAmount}
              className="donateInputLine"
              onChange={handleInputChange} />
            <LoadingButtonPresenter
              color="#555"
              dimensions={12}
              isLoading={isLoading}
              onClick={startNewSubscription}
              classNameProp="supportPlanUpdateButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':tada:', {attributes: {width: '18px', height: '18px', className: 'rightMarginHalfem'}})}{`UPDATE`}
              </span>
            </LoadingButtonPresenter>
          </div>
        </div>
      </div>
    : <div>
        <button
          onClick={() => toggleStateField('customInputRevealed')}
          className="supportPlanButton bottomMarginHalfem">EDIT MONTHLY AMOUNT</button>
        <div className={customInputRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p className="font12">You will be charged for the updated amount on your next billing date</p>
            <input
              name="updatePlanAmount"
              value={updatePlanAmount}
              className="donateInputLine"
              onChange={handleInputChange} />
            <LoadingButtonPresenter
              color="#555"
              dimensions={12}
              isLoading={isLoading}
              onClick={updateSubscription}
              classNameProp="supportPlanUpdateButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':heavy_check_mark:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`UPDATE`}
              </span>
            </LoadingButtonPresenter>
          </div>
        </div>
        <button
          onClick={() => toggleStateField('changeBillingRevealed')}
          className="supportPlanButton bottomMarginHalfem">CHANGE BILLING DATE</button>
        <div className={changeBillingRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p className="font12">Which day of the month would you like to be billed on?</p>
            <div className="radioButtonDiv topMarginHalfem">
              <input
                type="radio"
                id="1"
                name="selectedBillingOption"
                value="1"
                onChange={handleInputChange}
                checked={selectedBillingOption === '1'} />
              <label htmlFor="1" className="font12">
                <span />1st of the month</label>
            </div>
            <div className="radioButtonDiv">
              <input
                type="radio"
                id="15"
                name="selectedBillingOption"
                value="15"
                onChange={handleInputChange}
                checked={selectedBillingOption === '15'} />
              <label htmlFor="15" className="font12">
                <span />15th of the month</label>
            </div>
            <LoadingButtonPresenter
              color="#555"
              dimensions={12}
              isLoading={isLoading}
              onClick={changeBillingDate}
              classNameProp="supportPlanUpdateButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':heavy_check_mark:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`UPDATE`}
              </span>
            </LoadingButtonPresenter>
          </div>
        </div>
        <button
          onClick={() => toggleStateField('cancelButtonRevealed')}
          className="supportPlanButton">CANCEL SUPPORT PLAN</button>
        <div className={cancelButtonRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
          <div className="displayFlex flexColumn">
            <p className="font12">Are you sure you want to cancel your donation plan?</p>
            <LoadingButtonPresenter
              color="#555"
              dimensions={12}
              isLoading={isLoading}
              onClick={cancelSubscription}
              classNameProp="supportPlanCancelButton">
              <span className="emojiSpan">
                {ReactEmoji.emojify(':x:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`CANCEL`}
              </span>
            </LoadingButtonPresenter>
          </div>
        </div>
      </div>
    }
  </div>
)

export default SupportPlanButtonsSection
