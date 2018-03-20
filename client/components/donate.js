import React from 'react'
import { connect } from 'react-redux'

class Donate extends React.Component {
  render() {
    return (
      <div className="displayFlex flexColumn flex1">
        <h1>DONATE</h1>
      </div>
    )
  }
}

export default connect()(Donate)
