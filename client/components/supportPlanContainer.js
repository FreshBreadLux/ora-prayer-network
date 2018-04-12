import React from 'react'
import { connect } from 'react-redux'
import { fetchChargeHistory, incrementInvestmentTotal, updateSubscription, updateBillingDate, deleteSubscription, createSubscription } from '../store'
import SupportPlanPresenter from './SupportPlanPresenter'

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
      changeBillingRevealed: false,
      donationDate: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
      isLoading: false,
    }
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

  changeBillingDate() {
    this.setState({ isLoading: true })
    const { subscriptionInfo, jwToken, dispatchUpdateBillingDate } = this.props
    const billingDate = calculateBillingDate(this.state.donationDate)
    dispatchUpdateBillingDate(jwToken, subscriptionInfo, billingDate)
    .then(() => this.setState({
      donationDate: '',
      changeBillingRevealed: false,
      isLoading: false,
    }))
    .catch(console.error)
  }

  cancelSubscription() {
    this.setState({ isLoading: true })
    const { jwToken, subscriptionInfo, dispatchDeleteSubscription } = this.props
    dispatchDeleteSubscription(jwToken, subscriptionInfo)
    .then(() => this.setState({
        cancelButtonRevealed: false,
        isLoading: false,
    }))
    .catch(console.error)
  }

  startNewSubscription() {
    this.setState({ isLoading: true })
    const { userId, jwToken, dispatchCreateSubscription } = this.props
    const { startNewPlanAmount } = this.state
    dispatchCreateSubscription(userId, jwToken, startNewPlanAmount)
    .then(() => {
      this.props.dispatchIncrementInvestmentTotal(startNewPlanAmount * 100)
      this.props.dispatchFetchChargeHistory(userId, jwToken)
      this.setState({
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
        isLoading: false,
      })
    })
    .catch(console.error)
  }

  render() {
    return (
      <SupportPlanPresenter
        isLoading={this.state.isLoading}
        donationDate={this.state.donationDate}
        toggleStateField={this.toggleStateField}
        changeBillingDate={this.changeBillingDate}
        handleInputChange={this.handleInputChange}
        cancelSubscription={this.cancelSubscription}
        startNewSubscription={this.startNewSubscription}
        billingCycleAnchor={this.props.subscriptionInfo && this.props.subscriptionInfo.billing_cycle_anchor}
        startNewPlanAmount={this.state.startNewPlanAmount}
        customInputRevealed={this.state.customInputRevealed}
        cancelButtonRevealed={this.state.cancelButtonRevealed}
        startNewPlanRevealed={this.state.startNewPlanRevealed}
        changeBillingRevealed={this.state.changeBillingRevealed}
        plan={this.props.subscriptionInfo && this.props.subscriptionInfo.plan}
        created={this.props.subscriptionInfo && this.props.subscriptionInfo.created} />
    )
  }
}

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
  subscriptionInfo: state.subscriptionInfo,
})

const mapDispatch = dispatch => ({
  dispatchIncrementInvestmentTotal: amount => dispatch(incrementInvestmentTotal(amount)),
  dispatchFetchChargeHistory: (userId, jwToken) => dispatch(fetchChargeHistory(userId, jwToken)),
  dispatchUpdateSubscription: (userId, jwToken, subscriptionInfo, amount) => dispatch(updateSubscription(userId, jwToken, subscriptionInfo, amount)),
  dispatchUpdateBillingDate: (jwToken, subscriptionInfo, billingDate) => dispatch(updateBillingDate(jwToken, subscriptionInfo, billingDate)),
  dispatchDeleteSubscription: (jwToken, subscriptionInfo) => dispatch(deleteSubscription(jwToken, subscriptionInfo)),
  dispatchCreateSubscription: (userId, jwToken, amount) => dispatch(createSubscription(userId, jwToken, amount))
})

export default connect(mapState, mapDispatch)(SupportPlanContainer)
