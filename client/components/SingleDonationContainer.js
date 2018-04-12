import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchChargeHistory, incrementInvestmentTotal } from '../store'
import SingleDonationPresenter from './SingleDonationPresenter'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class SingleDonationContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singleDonation: '',
      singleDonationStatus: 'ready',
    }
    this.sayThanks = this.sayThanks.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.chargeSingleDonation = this.chargeSingleDonation.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  chargeSingleDonation() {
    this.setState({ singleDonationStatus: 'loading' })
    const { userId, jwToken, dispatchFetchChargeHistory, dispatchIncrementInvestmentTotal } = this.props
    const { singleDonation } = this.state
    axios.post(`${ROOT_URL}/api/donations/charges`, { userId, amount: +singleDonation * 100 }, {
      headers: {token: jwToken}
    })
    .then(charge => {
      dispatchFetchChargeHistory(userId, jwToken)
      dispatchIncrementInvestmentTotal(charge.data.amount)
    })
    .then(() => this.sayThanks())
    .catch(console.error)
  }

  sayThanks() {
    this.setState({
      singleDonation: '',
      singleDonationStatus: 'thank you',
    })
    setTimeout(() => {
      this.setState({ singleDonationStatus: 'ready' })
    }, 5000)
  }

  render() {
    return (
      <SingleDonationPresenter
        singleDonation={this.state.singleDonation}
        handleInputChange={this.handleInputChange}
        chargeSingleDonation={this.chargeSingleDonation}
        singleDonationStatus={this.state.singleDonationStatus} />
    )
  }
}

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
})

const mapDispatch = dispatch => ({
  dispatchFetchChargeHistory: (userId, jwToken) => dispatch(fetchChargeHistory(userId, jwToken)),
  dispatchIncrementInvestmentTotal: amount => dispatch(incrementInvestmentTotal(amount)),
})

export default connect(mapState, mapDispatch)(SingleDonationContainer)
