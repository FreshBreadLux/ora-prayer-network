import React from 'react'
import { connect } from 'react-redux'
import { deleteSubscription } from '../../store'
import { CancelPlanButtonPresenter } from '../'

class CancelPlanButtonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      cancelButtonRevealed: false,
    }
    this.toggleStateField = this.toggleStateField.bind(this)
    this.cancelSubscription = this.cancelSubscription.bind(this)
  }

  toggleStateField(field) {
    this.setState({ [field]: !this.state[field] })
  }

  cancelSubscription() {
    this.setState({ isLoading: true })
    const { jwToken, subscriptionInfo, dispatchDeleteSubscription } = this.props
    dispatchDeleteSubscription(jwToken, subscriptionInfo)
    .catch(console.error)
  }


  render() {
    return (
      <CancelPlanButtonPresenter
        isLoading={this.state.isLoading}
        toggleStateField={this.toggleStateField}
        cancelSubscription={this.cancelSubscription}
        cancelButtonRevealed={this.state.cancelButtonRevealed} />
    )
  }
}

const mapState = state => ({
  jwToken: state.auth.jwToken,
  subscriptionInfo: state.subscriptionInfo
})

const mapDispatch = dispatch => ({
  dispatchDeleteSubscription: (jwToken, subscriptionInfo) => dispatch(deleteSubscription(jwToken, subscriptionInfo))
})

export default connect(mapState, mapDispatch)(CancelPlanButtonContainer)
