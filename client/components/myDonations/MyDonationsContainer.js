import React from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo, fetchSubscriptionInfo, fetchChargeHistory, logout } from '../../store'
import { DonationPlanPresenter, CupOfJoeContainer, ChargeHistoryContainer, Footer } from '../'

class MyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.clearLocalStorageAndLogout = this.clearLocalStorageAndLogout.bind(this)
  }

  componentDidMount() {
    const { userId, jwToken, loadInitialData } = this.props
    loadInitialData(userId, jwToken)
  }

  clearLocalStorageAndLogout() {
    localStorage.removeItem('oraAuth')
    this.props.dispatchLogout()
  }

  render() {
    return (
      <div className="myDonationsBackgroundImage">
        <div className="donationContainerDiv">
          <DonationPlanPresenter />
          <CupOfJoeContainer />
          <ChargeHistoryContainer />
          <div className="displayFlex flexAllCenter">
            <div className="displayFlex flexAllCenter topMargin1em bottomMargin1em widthPercent65">
              <button
                onClick={this.clearLocalStorageAndLogout}
                className="logoutButton">LOGOUT</button>
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
