import React from 'react'
import { SingleDonationContainer, DonationPlanDetailPresenter, DonationPlanHeaderPresenter, DonationPlanOptionsPresenter } from '../../'

const DonationPlanPresenter = () => (
  <div>
    <DonationPlanHeaderPresenter />
    <div className="supportPlanDiv">
      <DonationPlanDetailPresenter />
      <SingleDonationContainer />
      <DonationPlanOptionsPresenter />
    </div>
  </div>
)

export default DonationPlanPresenter
