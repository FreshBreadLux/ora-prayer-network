import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Support extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      body: '',
      confirmation: null,
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubject = this.handleSubject.bind(this)
    this.handleBody = this.handleBody.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('api/support', {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      body: this.state.body
    })
    .then(confirmation => this.setState({confirmation}))
    .catch(error => this.setState({error}))
  }

  handleName(event) {
    this.setState({ name: event.target.value })
  }

  handleEmail(event) {
    this.setState({ email: event.target.value })
  }

  handleSubject(event) {
    this.setState({ subject: event.target.value })
  }

  handleBody(event) {
    this.setState({ body: event.target.value })
  }

  render() {
    return (
      <div className="displayFlex flexColumn flexAllCenter">
        <text className="raleway font20">Got questions?</text>
        <text className="raleway font20">Need to tell us about a bug?</text>
        <text className="raleway font20">Want to share your story?</text>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.name} onChange={this.handleName} />
          <input type="text" value={this.state.email} onChange={this.handleEmail} />
          <input type="text" value={this.state.subject} onChange={this.handleSubject} />
          <input type="text" value={this.subject.body} onChange={this.handleBody} />
        </form>
      </div>
    )
  }
}

export default connect()(Support)
