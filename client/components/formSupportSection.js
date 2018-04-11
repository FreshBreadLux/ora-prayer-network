import React from 'react'
import FormInputPresenter from './formInputPresenter'

const FormSupportSection = ({ handleDonationAmount, singleDonation, monthlyDonation }) => (
  <div>
    <p className="stripeFormSectionHeader">SUPPORT INFORMATION</p>
    <div className="selectAmountDiv">
      <FormInputPresenter
        step="0.01"
        type="number"
        inputMode="number"
        name="monthlyDonation"
        value={monthlyDonation}
        label="Monthly Donation"
        onChange={handleDonationAmount}
        notEmpty={!!monthlyDonation.length} />
      <FormInputPresenter
        step="0.01"
        type="number"
        inputMode="number"
        name="singleDonation"
        value={singleDonation}
        label="Single Donation"
        onChange={handleDonationAmount}
        notEmpty={!!singleDonation.length} />
    </div>
  </div>
)

export default FormSupportSection
