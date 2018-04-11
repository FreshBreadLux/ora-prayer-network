import React from 'react'
import Footer from './footer'
import { connect } from 'react-redux'
import { fetchUserInfo, fetchSubscriptionInfo, fetchChargeHistory } from '../store'
import SupportPlanContainer from './supportPlanContainer'
import CupOfJoeContainer from './cupOfJoeContainer'
import HistoryPresenter from './historyPresenter'

class MyDonationsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMoreCharges: false,
    }
    this.toggleShowMoreCharges = this.toggleShowMoreCharges.bind(this)
  }

  componentDidMount() {
    const { userId, jwToken, loadInitialData } = this.props
    loadInitialData(userId, jwToken)
  }

  toggleShowMoreCharges() {
    this.setState({showMoreCharges: !this.state.showMoreCharges})
  }

  render() {
    return (
      <div className="myDonationsBackgroundImage">
        <div className="donationContainerDiv">
          <SupportPlanContainer />
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
  }
})

export default connect(mapState, mapDispatch)(MyDonationsContainer)
