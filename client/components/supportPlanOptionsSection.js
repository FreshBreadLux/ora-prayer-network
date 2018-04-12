import React from 'react'
import EditAmountButtonContainer from './EditAmountButtonContainer'
import ChangeDateButtonPresenter from './changeDateButtonPresenter'
import CancelPlanButtonPresenter from './cancelPlanButtonPresenter'
import NewPlanButtonPresenter from './newPlanButtonPresenter'

const SupportPlanOptionsSection = ({ isLoading, toggleStateField, created, handleInputChange, cancelButtonRevealed, cancelSubscription, startNewPlanRevealed, startNewSubscription, startNewPlanAmount, changeBillingRevealed, donationDate, changeBillingDate }) => (
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
        <EditAmountButtonContainer />
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
