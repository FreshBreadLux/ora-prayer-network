import React from 'react'
import Footer from './footer'
import { connect } from 'react-redux'
import { fetchUserInfo, fetchSubscriptionInfo, fetchChargeHistory, logout } from '../store'
import SupportPlanContainer from './SupportPlanContainer'
import CupOfJoeContainer from './cupOfJoeContainer'
import HistoryPresenter from './historyPresenter'

class MyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMoreCharges: false,
    }
    this.toggleShowMoreCharges = this.toggleShowMoreCharges.bind(this)
    this.clearLocalStorageAndLogout = this.clearLocalStorageAndLogout.bind(this)
  }

  componentDidMount() {
    const { userId, jwToken, loadInitialData } = this.props
    loadInitialData(userId, jwToken)
  }

  toggleShowMoreCharges() {
    this.setState({showMoreCharges: !this.state.showMoreCharges})
  }

  clearLocalStorageAndLogout() {
    localStorage.removeItem('oraAuth')
    this.props.dispatchLogout()
  }

  render() {
    return (
      <div className="myDonationsBackgroundImage">
        <div className="donationContainerDiv">
          <SupportPlanContainer />
          <CupOfJoeContainer />
          <HistoryPresenter
            showMoreCharges={this.state.showMoreCharges}
            toggleShowMoreCharges={this.toggleShowMoreCharges} />
          <div className="displayFlex flexAllCenter">
            <div className="topMargin1em bottomMargin1em widthPercent65">
              <button
                onClick={this.clearLocalStorageAndLogout}
                className="supportPlanButton">LOGOUT</button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
})

const mapDispatch = dispatch => ({
  loadInitialData: (userId, jwToken) => {
    dispatch(fetchUserInfo(userId))
    dispatch(fetchSubscriptionInfo(userId, jwToken))
    dispatch(fetchChargeHistory(userId, jwToken))
  },
  dispatchLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(MyDonationsContainer)