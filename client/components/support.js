import React from 'react'
import { connect } from 'react-redux'

class Support extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      body: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="displayFlex flexColumn flexAllCenter">
        <text className="raleway font20">Got questions?</text>
        <text className="raleway font20">Need to tell us about a bug?</text>
        <text className="raleway font20">Want to share your story?</text>
        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    )
  }
}

export default connect()(Support)
