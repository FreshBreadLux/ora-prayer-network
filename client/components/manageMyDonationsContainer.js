import React from 'react'
import Footer from './footer'
import axios from 'axios'
import SupportPlanContainer from './supportPlanContainer'
import HistoryPresenter from './historyPresenter'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class ManageMyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subscriptionInfo: {plan: {amount: 0, interval: 'month'}},
      charges: [],
    }
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
    this.fetchChargeHistory = this.fetchChargeHistory.bind(this)
    this.setSubscriptionInfo = this.setSubscriptionInfo.bind(this)
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

  setSubscriptionInfo(subscriptionInfo) {
    this.setState({subscriptionInfo})
  }

  render() {
    console.log('state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1 paddingHalfem">
        <SupportPlanContainer
          userId={this.props.userId}
          jwToken={this.props.jwToken}
          fetchChargeHistory={this.fetchChargeHistory}
          setSubscriptionInfo={this.setSubscriptionInfo}
          subscriptionInfo={this.state.subscriptionInfo} />
        <HistoryPresenter charges={this.state.charges} />
        <button onClick={this.logout}>LOGOUT</button>
        <Footer />
      </div>
    )
  }
}

export default ManageMyDonationsContainer
