import React from 'react'
import { ChargeHistoryPresenter } from '../../'

class ChargeHistoryContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMoreCharges: false,
    }
    this.toggleShowMoreCharges = this.toggleShowMoreCharges.bind(this)
  }

  toggleShowMoreCharges() {
    this.setState({showMoreCharges: !this.state.showMoreCharges})
  }

  render() {
    return (
      <ChargeHistoryPresenter
        showMoreCharges={this.state.showMoreCharges}
        toggleShowMoreCharges={this.toggleShowMoreCharges} />
    )
  }
}

export default ChargeHistoryContainer
