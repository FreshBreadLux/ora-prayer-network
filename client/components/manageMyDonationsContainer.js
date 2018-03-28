import React from 'react'
import LoginPage from './loginPage'
import Footer from './footer'
import axios from 'axios'
import ManageMyDonationsPresenter from './manageMyDonationsPresenter'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class ManageMyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userId: null,
      jwToken: null,
      subscriptionInfo: {plan: {amount: 0, interval: 'month'}},
      customInputRevealed: false,
      updatePlanAmount: '',
      cancelButtonRevealed: false,
      startNewPlanRevealed: false,
      startNewPlanAmount: '',
      charges: [],
    }
    this.logout = this.logout.bind(this)
    this.verifyLogin = this.verifyLogin.bind(this)
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
    this.verifyLogin()
  }

  verifyLogin() {
    const oraAuth = localStorage.getItem('oraAuth')
    const oraAuthJson = JSON.parse(oraAuth)
    if (oraAuthJson) {
      this.fetchSubscriptions(oraAuthJson.userId)
      .then(() => this.fetchChargeHistory(oraAuthJson.userId))
      .then(() => {
        this.setState({
          isLoggedIn: true,
          userId: oraAuthJson.userId,
          jwToken: oraAuthJson.jwToken
        })
      })
      .catch(console.error)
    }
  }

  fetchSubscriptions(userId) {
    return axios.get(`${ROOT_URL}/api/donations/subscription/forUser/${userId}`)
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

  fetchChargeHistory(userId) {
    return axios.get(`${ROOT_URL}/api/donations/chargeHistory/forUser/${userId}`)
    .then(charges => {
      this.setState({ charges: charges.data.data })
    })
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
    const { userId, updatePlanAmount, subscriptionInfo } = this.state
    axios.post(`${ROOT_URL}/api/donations/updateSubscription/forUser/${userId}`, {
      updatePlanAmount: +updatePlanAmount * 100,
      subscriptionId: subscriptionInfo.id
    })
    .then(subscription => this.setState({ subscriptionInfo: subscription.data }))
    .catch(console.error)
  }

  cancelSubscription() {
    const { subscriptionInfo } = this.state
    axios.delete(`${ROOT_URL}/api/donations/subscription/${subscriptionInfo.id}`)
    .then(() => {
      this.setState({ subscriptionInfo: {
        plan: { amount: 0, interval: 'month' },
        created: 'CANCELED'
      }})
    })
    .catch(console.error)
  }

  startNewSubscription() {
    const { userId, startNewPlanAmount } = this.state
    axios.post(`${ROOT_URL}/api/donations/subscription`, {
      userId,
      amount: +startNewPlanAmount * 100
    })
    .then(subscription => this.setState({ subscriptionInfo: subscription.data }))
    .catch(console.error)
  }

  logout(){
    localStorage.removeItem('oraAuth')
    this.setState({
      isLoggedIn: false,
      userId: null,
      jwToken: null
    })
  }

  render() {
    console.log('state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1">
        {!this.state.isLoggedIn
        ? <LoginPage verifyLogin={this.verifyLogin} />
        : <ManageMyDonationsPresenter
            logout={this.logout}
            charges={this.state.charges}
            plan={this.state.subscriptionInfo && this.state.subscriptionInfo.plan}
            toggleCustomInput={this.toggleCustomInput}
            handleInputChange={this.handleInputChange}
            toggleCancelButton={this.toggleCancelButton}
            updateSubscription={this.updateSubscription}
            cancelSubscription={this.cancelSubscription}
            created={this.state.subscriptionInfo && this.state.subscriptionInfo.created}
            startNewPlanRevealed={this.state.startNewPlanRevealed}
            toggleStartNewPlan={this.toggleStartNewPlan}
            startNewSubscription={this.startNewSubscription}
            customInputRevealed={this.state.customInputRevealed}
            cancelButtonRevealed={this.state.cancelButtonRevealed} />
        }
        <Footer />
      </div>
    )
  }
}

export default ManageMyDonationsContainer
