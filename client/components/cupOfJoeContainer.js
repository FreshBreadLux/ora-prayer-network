import React from 'react'
import CupOfJoePresenter from './cupOfJoePresenter'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class CupOfJoeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boughtCoffee: false
    }
    this.buyCoffee = this.buyCoffee.bind(this)
  }

  buyCoffee() {
    const { userId, jwToken, fetchChargeHistory } = this.props
    axios.post(`${ROOT_URL}/api/donations/buyCoffee`, {
      userId
    }, {
      headers: {token: jwToken}
    })
    .then(() => fetchChargeHistory(userId, jwToken))
  }

  render() {
    return (
      <CupOfJoePresenter buyCoffee={this.buyCoffee} />
    )
  }
}

export default CupOfJoeContainer
