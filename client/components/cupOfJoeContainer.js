import React from 'react'
import { connect } from 'react-redux'
import { fetchChargeHistory, incrementInvestmentTotal } from '../store'
import CupOfJoePresenter from './cupOfJoePresenter'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class CupOfJoeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coffeeStatus: 'ready'
    }
    this.buyCoffee = this.buyCoffee.bind(this)
    this.sayThanks = this.sayThanks.bind(this)
  }

  buyCoffee() {
    this.setState({ coffeeStatus: 'loading' })
    const { userId, jwToken, dispatchFetchChargeHistory, dispatchIncrementInvestmentTotal } = this.props
    axios.post(`${ROOT_URL}/api/donations/charges`, { userId, amount: 300 }, {
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
    this.setState({ coffeeStatus: 'thank you' })
    setTimeout(() => {
      this.setState({ coffeeStatus: 'ready' })
    }, 5000)
  }

  render() {
    return (
      <CupOfJoePresenter
        buyCoffee={this.buyCoffee}
        coffeeStatus={this.state.coffeeStatus} />
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

export default connect(mapState, mapDispatch)(CupOfJoeContainer)
