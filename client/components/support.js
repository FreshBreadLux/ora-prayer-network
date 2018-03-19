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
    .then(confirmation => this.setState({
      name: '',
      email: '',
      subject: '',
      body: '',
      confirmation: confirmation.data
    }))
    .catch(error => {
      console.log(error)
      this.setState({error})
    })
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
        <div className="padding1em displayFlex flexColumn flexAllCenter">
          <p className="raleway font20">Got questions?</p>
          <p className="raleway font20">Need to tell us about a bug?</p>
          <p className="raleway font20">Want to share your story?</p>
        </div>
        <div>
          {this.state.confirmation
          ? <p className="raleway font20 padding1em">{this.state.confirmation}</p>
          : <div>
              {this.state.error
              ? <p className="raleway font20 padding1em">{this.state.error}</p>
              : null
              }
            </div>
          }
        </div>
        <form className="displayFlex flexColumn vw40 flexAllCenter" onSubmit={this.handleSubmit}>
          <input
            className="vw40 font20 paddingHalfem raleway bottomMargin1em"
            placeholder="Name"
            type="text"
            value={this.state.name}
            onChange={this.handleName} />
          <input
            className="vw40 font20 paddingHalfem raleway bottomMargin1em"
            placeholder="Email"
            type="text"
            value={this.state.email}
            onChange={this.handleEmail} />
          <input
            className="vw40 font20 paddingHalfem raleway bottomMargin1em"
            placeholder="Subject"
            type="text"
            value={this.state.subject}
            onChange={this.handleSubject} />
          <input
            className="vw40 font20 paddingHalfem raleway bottomMargin1em"
            placeholder="Body"
            type="text"
            value={this.state.body}
            onChange={this.handleBody} />
          <input
            className="raleway vw25 font20"
            type="submit"
            value="HIT US UP" />
        </form>
      </div>
    )
  }
}

export default connect()(Support)
