import React from 'react'
import FormInputPresenter from './formInputPresenter'

const FormSupportSection = ({ handleDonationAmount, singleDonation, monthlyDonation }) => (
  <div>
    <p className="stripeFormSectionHeader">SUPPORT INFORMATION</p>
    <div className="selectAmountDiv">
      <FormInputPresenter
        type="text"
        inputMode="text"
        name="monthlyDonation"
        value={monthlyDonation}
        label="Monthly Donation"
        onChange={handleDonationAmount}
        notEmpty={!!monthlyDonation.length} />
      <FormInputPresenter
        type="text"
        inputMode="text"
        name="singleDonation"
        value={singleDonation}
        label="Single Donation"
        onChange={handleDonationAmount}
        notEmpty={!!singleDonation.length} />
    </div>
  </div>
)

export default FormSupportSection
