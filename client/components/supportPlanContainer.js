import React from 'react'
import SupportPlanPresenter from './supportPlanPresenter'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

function calculateBillingDate(day) {
  const now = new Date()
  let billingDate = new Date(now.getFullYear(), now.getMonth(), +day)
  if (now - billingDate > 0) billingDate.setMonth(now.getMonth() + 1)
  return billingDate.getTime() / 1000
}

class SupportPlanContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customInputRevealed: false,
      updatePlanAmount: '',
      changeBillingRevealed: false,
      selectedBillingOption: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
      isLoading: false,
    }
    this.updateSubscription = this.updateSubscription.bind(this)
    this.cancelSubscription = this.cancelSubscription.bind(this)
    this.startNewSubscription = this.startNewSubscription.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleStateField = this.toggleStateField.bind(this)
    this.changeBillingDate = this.changeBillingDate.bind(this)
  }

  toggleStateField(field) {
    this.setState({ [field]: !this.state[field] })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  updateSubscription() {
    this.setState({ isLoading: true })
    const { userId, jwToken, subscriptionInfo } = this.props
    const { updatePlanAmount } = this.state
    axios.post(`${ROOT_URL}/api/donations/updateSubscription/forUser/${userId}`, {
      updatePlanAmount: +updatePlanAmount * 100,
      subscriptionId: subscriptionInfo.id
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => {
      this.props.incrementInvestmentTotal(updatePlanAmount * 100)
      this.props.setSubscriptionInfo(subscription.data)
      this.setState({
        customInputRevealed: false,
        updatePlanAmount: '',
        isLoading: false,
      })
    })
    .then(() => this.props.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  changeBillingDate() {
    this.setState({ isLoading: true })
    const { id } = this.props.subscriptionInfo
    const billingDate = calculateBillingDate(this.state.selectedBillingOption)
    axios.put(`${ROOT_URL}/api/donations/subscription/${id}`, {
      billingDate,
    })
    .then(subscription => {
      this.props.setSubscriptionInfo(subscription.data)
      this.setState({
        selectedBillingOption: '',
        changeBillingRevealed: false,
        isLoading: false,
      })
    })
    .catch(console.error)
  }

  cancelSubscription() {
    this.setState({ isLoading: true })
    const { jwToken, subscriptionInfo } = this.props
    axios.delete(`${ROOT_URL}/api/donations/subscription/${subscriptionInfo.id}`, {
      headers: {token: jwToken}
    })
    .then(() => {
      this.props.setSubscriptionInfo({plan: {amount: 0, interval: 'month'}, created: 'CANCELED'})
      this.setState({
        cancelButtonRevealed: false,
        isLoading: false,
      })
    })
    .catch(console.error)
  }

  startNewSubscription() {
    this.setState({ isLoading: true })
    const { userId, jwToken } = this.props
    const { startNewPlanAmount } = this.state
    axios.post(`${ROOT_URL}/api/donations/subscription`, {
      userId,
      amount: +startNewPlanAmount * 100
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => {
      this.props.incrementInvestmentTotal(startNewPlanAmount * 100)
      this.props.setSubscriptionInfo(subscription.data)
      this.setState({
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
        isLoading: false,
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
        isLoading={this.state.isLoading}
        toggleStateField={this.toggleStateField}
        changeBillingDate={this.changeBillingDate}
        handleInputChange={this.handleInputChange}
        investmentTotal={this.props.investmentTotal}
        updateSubscription={this.updateSubscription}
        cancelSubscription={this.cancelSubscription}
        updatePlanAmount={this.state.updatePlanAmount}
        startNewSubscription={this.startNewSubscription}
        billingCycleAnchor={this.props.subscriptionInfo && this.props.subscriptionInfo.billing_cycle_anchor}
        startNewPlanAmount={this.state.startNewPlanAmount}
        customInputRevealed={this.state.customInputRevealed}
        cancelButtonRevealed={this.state.cancelButtonRevealed}
        startNewPlanRevealed={this.state.startNewPlanRevealed}
        changeBillingRevealed={this.state.changeBillingRevealed}
        selectedBillingOption={this.state.selectedBillingOption}
        plan={this.props.subscriptionInfo && this.props.subscriptionInfo.plan}
        created={this.props.subscriptionInfo && this.props.subscriptionInfo.created} />
    )
  }
}

export default SupportPlanContainer
