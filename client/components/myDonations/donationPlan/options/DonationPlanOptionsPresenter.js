import React from 'react'
import { connect } from 'react-redux'
import { EditAmountButtonContainer, ChangeDateButtonContainer, CancelPlanButtonContainer, NewPlanButtonContainer } from '../../../'

const DonationPlanOptionsPresenter = ({ created }) => (
  <div className="displayFlex flexColumn">
    <p className="supportPlanHeader">OPTIONS</p>
    {created === 'CANCELED'
    ? <NewPlanButtonContainer />
    : <div>
        <EditAmountButtonContainer />
        <ChangeDateButtonContainer />
        <CancelPlanButtonContainer />
      </div>
    }
  </div>
)

const mapState = state => ({
  created: state.subscriptionInfo.created
})

export default connect(mapState)(DonationPlanOptionsPresenter)
