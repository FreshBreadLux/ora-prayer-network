import React from 'react'
import { FormInputPresenter } from '../'

const FormSupportPresenter = ({ handleDonationAmount, singleDonation, monthlyDonation }) => (
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
      <p className="stripeFormSubText">Your first donation will occur immediately and recur on this date each month. You can edit your donation date and amount after signup.</p>
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

export default FormSupportPresenter
