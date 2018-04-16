import React from 'react'
import { SingleDonationContainer, DonationPlanDetailPresenter, DonationPlanHeaderPresenter, DonationPlanOptionsPresenter } from '../../'

const DonationPlanPresenter = () => (
  <div>
    <p className="mobileHeader">MY DONATIONS</p>
    <div className="donationPlanDiv">
      <DonationPlanHeaderPresenter />
      <DonationPlanDetailPresenter />
      <SingleDonationContainer />
      <DonationPlanOptionsPresenter />
    </div>
  </div>
)

export default DonationPlanPresenter
