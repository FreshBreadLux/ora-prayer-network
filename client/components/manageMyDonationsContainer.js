import React from 'react'
import Footer from './footer'
import axios from 'axios'
import ManageMyDonationsPresenter from './manageMyDonationsPresenter'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class ManageMyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subscriptionInfo: {plan: {amount: 0, interval: 'month'}},
      customInputRevealed: false,
      updatePlanAmount: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
      charges: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleCustomInput = this.toggleCustomInput.bind(this)
    this.toggleCancelButton = this.toggleCancelButton.bind(this)
    this.toggleStartNewPlan = this.toggleStartNewPlan.bind(this)
    this.updateSubscription = this.updateSubscription.bind(this)
    this.cancelSubscription = this.cancelSubscription.bind(this)
    this.startNewSubscription = this.startNewSubscription.bind(this)
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
    this.fetchChargeHistory = this.fetchChargeHistory.bind(this)
  }

  componentDidMount() {
    const { userId, jwToken } = this.props
    this.fetchSubscriptions(userId, jwToken)
    .then(() => this.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  fetchSubscriptions(userId, jwToken) {
    return axios.get(`${ROOT_URL}/api/donations/subscription/forUser/${userId}`, {
      headers: {token: jwToken}
    })
    .then(subscriptions => {
      if (subscriptions.data.data[0]) {
        this.setState({ subscriptionInfo: subscriptions.data.data[0] })
      } else {
        this.setState({
          subscriptionInfo: {
            plan: {amount: 0, interval: 'month'},
            created: 'CANCELED'
          }
        })
      }
    })
  }

  fetchChargeHistory(userId, jwToken) {
    return axios.get(`${ROOT_URL}/api/donations/chargeHistory/forUser/${userId}`, {
      headers: {token: jwToken}
    })
    .then(charges => this.setState({ charges: charges.data.data }))
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
    const { userId, jwToken } = this.props
    const { updatePlanAmount, subscriptionInfo } = this.state
    axios.post(`${ROOT_URL}/api/donations/updateSubscription/forUser/${userId}`, {
      updatePlanAmount: +updatePlanAmount * 100,
      subscriptionId: subscriptionInfo.id
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => this.setState({
      subscriptionInfo: subscription.data,
      customInputRevealed: false,
      updatePlanAmount: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
    }))
    .then(() => this.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  cancelSubscription() {
    const { jwToken } = this.props
    const { subscriptionInfo } = this.state
    axios.delete(`${ROOT_URL}/api/donations/subscription/${subscriptionInfo.id}`, {
      headers: {token: jwToken}
    })
    .then(() => {
      this.setState({ subscriptionInfo: {
        plan: { amount: 0, interval: 'month' },
        created: 'CANCELED',
        customInputRevealed: false,
        updatePlanAmount: '',
        cancelButtonRevealed: false,
        startNewPlanRevealed: false,
        startNewPlanAmount: '',
      }})
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
    .then(subscription => this.setState({
      subscriptionInfo: subscription.data,
      customInputRevealed: false,
      updatePlanAmount: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
    }))
    .then(() => this.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  render() {
    console.log('state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1">
        <ManageMyDonationsPresenter
          logout={this.logout}
          charges={this.state.charges}
          plan={this.state.subscriptionInfo && this.state.subscriptionInfo.plan}
          toggleCustomInput={this.toggleCustomInput}
          handleInputChange={this.handleInputChange}
          toggleCancelButton={this.toggleCancelButton}
          updateSubscription={this.updateSubscription}
          updatePlanAmount={this.state.updatePlanAmount}
          cancelSubscription={this.cancelSubscription}
          created={this.state.subscriptionInfo && this.state.subscriptionInfo.created}
          startNewPlanRevealed={this.state.startNewPlanRevealed}
          toggleStartNewPlan={this.toggleStartNewPlan}
          startNewSubscription={this.startNewSubscription}
          startNewPlanAmount={this.state.startNewPlanAmount}
          customInputRevealed={this.state.customInputRevealed}
          cancelButtonRevealed={this.state.cancelButtonRevealed} />
        <Footer />
      </div>
    )
  }
}

export default ManageMyDonationsContainer
