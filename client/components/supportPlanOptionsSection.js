import React from 'react'
import EditAmountButtonPresenter from './editAmountButtonPresenter'
import ChangeDateButtonPresenter from './changeDateButtonPresenter'
import CancelPlanButtonPresenter from './cancelPlanButtonPresenter'
import NewPlanButtonPresenter from './newPlanButtonPresenter'

const SupportPlanOptionsSection = ({ isLoading, toggleStateField, created, customInputRevealed, handleInputChange, updateSubscriptionAmount, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, startNewSubscription, startNewPlanAmount, updatePlanAmount, changeBillingRevealed, donationDate, changeBillingDate }) => (
  <div className="displayFlex flexColumn">
    <p className="supportPlanHeader">OPTIONS</p>
    {created === 'CANCELED'
    ? <NewPlanButtonPresenter
        isLoading={isLoading}
        toggleStateField={toggleStateField}
        handleInputChange={handleInputChange}
        startNewPlanAmount={startNewPlanAmount}
        startNewPlanRevealed={startNewPlanRevealed}
        startNewSubscription={startNewSubscription} />
    : <div>
        <EditAmountButtonPresenter
          isLoading={isLoading}
          toggleStateField={toggleStateField}
          updatePlanAmount={updatePlanAmount}
          handleInputChange={handleInputChange}
          updateSubscriptionAmount={updateSubscriptionAmount}
          customInputRevealed={customInputRevealed} />
        <ChangeDateButtonPresenter
          isLoading={isLoading}
          donationDate={donationDate}
          toggleStateField={toggleStateField}
          changeBillingDate={changeBillingDate}
          handleInputChange={handleInputChange}
          changeBillingRevealed={changeBillingRevealed} />
        <CancelPlanButtonPresenter
          isLoading={isLoading}
          toggleStateField={toggleStateField}
          cancelSubscription={cancelSubscription}
          cancelButtonRevealed={cancelButtonRevealed} />
      </div>
    }
  </div>
)

export default SupportPlanOptionsSection
