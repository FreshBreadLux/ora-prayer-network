import React from 'react'
import SingleDonationContainer from './SingleDonationContainer'
import SupportPlanDetailPresenter from './SupportPlanDetailPresenter'
import SupportPlanHeaderPresenter from './SupportPlanHeaderPresenter'
import SupportPlanOptionsPresenter from './SupportPlanOptionsPresenter'

const SupportPlanPresenter = () => (
  <div>
    <SupportPlanHeaderPresenter />
    <div className="supportPlanDiv">
      <SupportPlanDetailPresenter />
      <SingleDonationContainer />
      <SupportPlanOptionsPresenter />
    </div>
  </div>
)

export default SupportPlanPresenter
