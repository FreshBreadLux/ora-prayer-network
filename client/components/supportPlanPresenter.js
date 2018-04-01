import React from 'react'
import ReactEmoji from 'react-emoji'
import SupportPlanButtonsSection from './supportPlanButtonsSection'

const SupportPlanPresenter = ({ charges, userName, created, toggleCustomInput, handleInputChange, updateSubscription, toggleCancelButton, cancelSubscription, toggleStartNewPlan, startNewPlanRevealed, startNewSubscription, customInputRevealed, cancelButtonRevealed, plan, startNewPlanAmount, updatePlanAmount }) => (
  <div>
    <div className="displayFlex flexJustifyBetween bottomMarginHalfem">
      <p className="raleway font24">{`${userName.first} ${userName.last}`}</p>
      <p className="raleway font30">{`$${charges.reduce((acc, cur) => acc + cur.amount, 0) / 100}`}</p>
    </div>
    <div className="displayFlex flexJustifyBetween flexAlignEnd bottomMarginHalfem">
      <p className="raleway font20">ANGEL INVESTOR</p>
      <p className="raleway font12 rightText">INVESTMENT<br />TOTAL</p>
    </div>
    <div className="supportPlanDiv">
      <div className="displayFlex bottomMargin1em">
        <div className="displayFlex flex3">
          <div className="displayFlex flexColumn">
            <p className="bottomMarginHalfem">
              <span className="emojiSpan">
                {`SUPPORT PLAN`}
                {created === 'CANCELED'
                ? null
                : ReactEmoji.emojify(':heart:', {attributes: {width: '16px', height: '16px', className: 'leftMarginHalfem'}})
                }
              </span>
            </p>
            <p className="font12">
              {created === 'CANCELED'
              ? created
              : `STARTED: ${new Date(created * 1000).toDateString().slice(3)
              .toUpperCase()}`}
            </p>
          </div>
        </div>
        <div className="displayFlex flex2 flexJustifyEnd">
          <div className="displayFlex flexColumn">
            <p className="font30">{`$${plan.amount / 100}`}</p>
            <p className="font12 rightText">{`per ${plan.interval}`}</p>
          </div>
        </div>
      </div>
      <div className="displayFlex flexJustifyCenter">
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
      </div>
    </div>
  </div>
)

export default SupportPlanPresenter
