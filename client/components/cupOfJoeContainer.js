import React from 'react'
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
    console.log('buying coffee...')
    this.setState({ coffeeStatus: 'loading' })
    const { userId, jwToken, fetchChargeHistory, incrementInvestmentTotal } = this.props
    axios.post(`${ROOT_URL}/api/donations/buyCoffee`, {
      userId
    }, {
      headers: {token: jwToken}
    })
    .then(charge => {
      console.log('charge successful: ', charge)
      fetchChargeHistory(userId, jwToken)
      incrementInvestmentTotal(charge.data.amount)
    })
    .then(() => this.sayThanks())
    .catch(console.error)
  }

  sayThanks() {
    this.setState({ coffeeStatus: 'thank you' })
    setTimeout(() => {
      this.setState({ coffeeStatus: 'ready' })
    }, 3000);
  }

  render() {
    return (
      <CupOfJoePresenter
        buyCoffee={this.buyCoffee}
        coffeeStatus={this.state.coffeeStatus} />
    )
  }
}

export default CupOfJoeContainer
