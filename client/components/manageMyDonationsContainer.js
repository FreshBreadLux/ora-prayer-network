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
      subscriptionInfo: null,
      customInputRevealed: false,
      updatePlanAmount: '',
    }
    this.logout = this.logout.bind(this)
    this.verifyLogin = this.verifyLogin.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleCustomInput = this.toggleCustomInput.bind(this)
    this.updateSubscription = this.updateSubscription.bind(this)
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
  }

  componentDidMount() {
    this.verifyLogin()
  }

  verifyLogin() {
    const oraAuth = localStorage.getItem('oraAuth')
    const oraAuthJson = JSON.parse(oraAuth)
    if (oraAuthJson) {
      this.fetchSubscriptions(oraAuthJson.userId)
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
      this.setState({ subscriptionInfo: subscriptions.data.data[0] })
    })
  }

  toggleCustomInput() {
    this.setState({ customInputRevealed: !this.state.customInputRevealed })
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
            plan={this.state.subscriptionInfo.plan}
            toggleCustomInput={this.toggleCustomInput}
            handleInputChange={this.handleInputChange}
            updateSubscription={this.updateSubscription}
            created={this.state.subscriptionInfo.created}
            customInputRevealed={this.state.customInputRevealed} />
        }
        <Footer />
      </div>
    )
  }
}

export default ManageMyDonationsContainer
