import React from 'react'
import { SingleDonationContainer, DonationPlanDetailPresenter, DonationPlanHeaderPresenter, DonationPlanOptionsPresenter } from '../../'

const DonationPlanPresenter = () => (
  <div>
    <p className="mobileHeader">MY DONATIONS</p>
    <DonationPlanHeaderPresenter />
    <div className="donationPlanDiv">
      <DonationPlanDetailPresenter />
      <SingleDonationContainer />
      <DonationPlanOptionsPresenter />
    </div>
  </div>
)

export default DonationPlanPresenter
