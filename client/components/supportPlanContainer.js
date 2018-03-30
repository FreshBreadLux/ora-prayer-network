import React from 'react'
import SupportPlanPresenter from './supportPlanPresenter'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class SupportPlanContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customInputRevealed: false,
      updatePlanAmount: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
    }
    this.updateSubscription = this.updateSubscription.bind(this)
    this.cancelSubscription = this.cancelSubscription.bind(this)
    this.startNewSubscription = this.startNewSubscription.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleCustomInput = this.toggleCustomInput.bind(this)
    this.toggleCancelButton = this.toggleCancelButton.bind(this)
    this.toggleStartNewPlan = this.toggleStartNewPlan.bind(this)
  }

  toggleCustomInput() {
    this.setState({ customInputRevealed: !this.state.customInputRevealed })
  }

  toggleCancelButton() {
    this.setState({ cancelButtonRevealed: !this.state.cancelButtonRevealed })
  }

  toggleStartNewPlan() {
    this.setState({ startNewPlanRevealed: !this.state.startNewPlanRevealed })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  updateSubscription() {
    const { userId, jwToken, subscriptionInfo } = this.props
    const { updatePlanAmount } = this.state
    axios.post(`${ROOT_URL}/api/donations/updateSubscription/forUser/${userId}`, {
      updatePlanAmount: +updatePlanAmount * 100,
      subscriptionId: subscriptionInfo.id
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => {
      this.props.setSubscriptionInfo(subscription.data)
      this.setState({
        customInputRevealed: false,
        updatePlanAmount: '',
        cancelButtonRevealed: false,
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
      })
    })
    .then(() => this.props.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  cancelSubscription() {
    const { jwToken, subscriptionInfo } = this.props
    axios.delete(`${ROOT_URL}/api/donations/subscription/${subscriptionInfo.id}`, {
      headers: {token: jwToken}
    })
    .then(() => {
      this.props.setSubscriptionInfo({plan: {amount: 0, interval: 'month'}, created: 'CANCELED'})
      this.setState({
        customInputRevealed: false,
        updatePlanAmount: '',
        cancelButtonRevealed: false,
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
      })
    })
    .catch(console.error)
  }

  startNewSubscription() {
    const { userId, jwToken } = this.props
    const { startNewPlanAmount } = this.state
    axios.post(`${ROOT_URL}/api/donations/subscription`, {
      userId,
      amount: +startNewPlanAmount * 100
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => {
      this.props.setSubscriptionInfo(subscription.data)
      this.setState({
        customInputRevealed: false,
        updatePlanAmount: '',
        cancelButtonRevealed: false,
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
      })
    })
    .then(() => this.props.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  render() {
    console.log('supportPlan state: ', this.state)
    return (
      <SupportPlanPresenter
        userName={this.props.userName}
        toggleCustomInput={this.toggleCustomInput}
        handleInputChange={this.handleInputChange}
        toggleCancelButton={this.toggleCancelButton}
        updateSubscription={this.updateSubscription}
        updatePlanAmount={this.state.updatePlanAmount}
        cancelSubscription={this.cancelSubscription}
        startNewPlanRevealed={this.state.startNewPlanRevealed}
        toggleStartNewPlan={this.toggleStartNewPlan}
        startNewSubscription={this.startNewSubscription}
        startNewPlanAmount={this.state.startNewPlanAmount}
        customInputRevealed={this.state.customInputRevealed}
        cancelButtonRevealed={this.state.cancelButtonRevealed}
        plan={this.props.subscriptionInfo && this.props.subscriptionInfo.plan}
        created={this.props.subscriptionInfo && this.props.subscriptionInfo.created} />
    )
  }
}

export default SupportPlanContainer
