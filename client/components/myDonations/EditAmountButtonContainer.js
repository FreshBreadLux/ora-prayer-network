import React from 'react'
import { connect } from 'react-redux'
import { fetchChargeHistory, updateSubscription } from '../../store'
import { EditAmountButtonPresenter } from '../'

class EditAmountButtonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      updatePlanAmount: '',
      customInputRevealed: false,
    }
    this.toggleStateField = this.toggleStateField.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateSubscriptionAmount = this.updateSubscriptionAmount.bind(this)
  }

  toggleStateField(field) {
    this.setState({ [field]: !this.state[field] })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  updateSubscriptionAmount() {
    this.setState({ isLoading: true })
    const { userId, jwToken, subscriptionInfo, dispatchUpdateSubscription, dispatchFetchChargeHistory } = this.props
    const { updatePlanAmount } = this.state
    dispatchUpdateSubscription(userId, jwToken, subscriptionInfo, updatePlanAmount)
    .then(() => this.setState({
      customInputRevealed: false,
      updatePlanAmount: '',
      isLoading: false,
    }))
    .then(() => dispatchFetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  render() {
    return (
      <EditAmountButtonPresenter
        isLoading={this.state.isLoading}
        toggleStateField={this.toggleStateField}
        handleInputChange={this.handleInputChange}
        updatePlanAmount={this.state.updatePlanAmount}
        customInputRevealed={this.state.customInputRevealed}
        updateSubscriptionAmount={this.updateSubscriptionAmount} />
    )
  }
}

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
  subscriptionInfo: state.subscriptionInfo,
})

const mapDispatch = dispatch => ({
  dispatchFetchChargeHistory: (userId, jwToken) => dispatch(fetchChargeHistory(userId, jwToken)),
  dispatchUpdateSubscription: (userId, jwToken, subscriptionInfo, amount) => dispatch(updateSubscription(userId, jwToken, subscriptionInfo, amount)),
})

export default connect(mapState, mapDispatch)(EditAmountButtonContainer)
