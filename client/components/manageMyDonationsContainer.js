import React from 'react'
import Footer from './footer'
import axios from 'axios'
import SupportPlanContainer from './supportPlanContainer'
import CupOfJoeContainer from './cupOfJoeContainer'
import HistoryPresenter from './historyPresenter'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class ManageMyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subscriptionInfo: {plan: {amount: 0, interval: 'month'}},
      charges: [],
      userName: {first: 'Support', last: 'Team'},
      investmentTotal: 0,
      showMoreCharges: false,
    }
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
    this.fetchChargeHistory = this.fetchChargeHistory.bind(this)
    this.setSubscriptionInfo = this.setSubscriptionInfo.bind(this)
    this.incrementInvestmentTotal = this.incrementInvestmentTotal.bind(this)
    this.toggleShowMoreCharges = this.toggleShowMoreCharges.bind(this)
  }

  componentDidMount() {
    const { userId, jwToken } = this.props
    this.fetchUserInfo(userId)
    .then(() => this.fetchSubscriptions(userId, jwToken))
    .then(() => this.fetchChargeHistory(userId, jwToken))
    .catch(console.error)
  }

  fetchUserInfo(userId) {
    return axios.get(`${ROOT_URL}/api/users/${userId}`)
    .then(user => this.setState({
      userName: {first: user.data.firstName, last: user.data.lastName},
      investmentTotal: user.data.investmentTotal
    }))
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

  fetchChargeHistory(userId, jwToken, limit = 10) {
    return axios.get(`${ROOT_URL}/api/donations/chargeHistory/forUser/${userId}/limit/${limit}`, {
      headers: {token: jwToken}
    })
    .then(charges => this.setState({ charges: charges.data.data }))
  }

  setSubscriptionInfo(subscriptionInfo) {
    this.setState({subscriptionInfo})
  }

  incrementInvestmentTotal(amount) {
    this.setState({ investmentTotal: this.state.investmentTotal + amount })
  }

  toggleShowMoreCharges() {
    this.setState({showMoreCharges: !this.state.showMoreCharges})
  }

  render() {
    console.log('manageDonations state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1 paddingHalfem">
        <SupportPlanContainer
          userId={this.props.userId}
          jwToken={this.props.jwToken}
          charges={this.state.charges}
          userName={this.state.userName}
          investmentTotal={this.state.investmentTotal}
          fetchChargeHistory={this.fetchChargeHistory}
          setSubscriptionInfo={this.setSubscriptionInfo}
          subscriptionInfo={this.state.subscriptionInfo}
          incrementInvestmentTotal={this.incrementInvestmentTotal} />
        <CupOfJoeContainer
          userId={this.props.userId}
          jwToken={this.props.jwToken}
          fetchChargeHistory={this.fetchChargeHistory}
          incrementInvestmentTotal={this.incrementInvestmentTotal} />
        <HistoryPresenter
          userId={this.props.userId}
          jwToken={this.props.jwToken}
          charges={this.state.charges}
          fetchChargeHistory={this.fetchChargeHistory}
          showMoreCharges={this.state.showMoreCharges}
          toggleShowMoreCharges={this.toggleShowMoreCharges} />
        <div className="displayFlex flexAllCenter">
          <div className="topMargin1em bottomMargin1em widthPercent65">
            <button
              onClick={this.props.logout}
              className="supportPlanButton">LOGOUT</button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default ManageMyDonationsContainer
