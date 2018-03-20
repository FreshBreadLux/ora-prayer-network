import React from 'react'
import { connect } from 'react-redux'
import Footer from './footer'
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
      <div className="displayFlex flexColumn flex1">
        <div className="displayFlex flexColumn flex1 flexAllCenter">
          <div className="padding1em displayFlex flexColumn flexAllCenter">
            <p className="raleway font24 centerText">Got questions?</p>
            <p className="raleway font24 centerText">Need to tell us about a bug?</p>
            <p className="raleway font24 centerText">Want to share your story?</p>
          </div>
          {this.state.confirmation
          ? <div className="messageFade">
              <p className="raleway font20 padding1em centerText">{this.state.confirmation}</p>
            </div>
          : <div>
              {this.state.error
              ? <div className="messageFade">
                  <p className="raleway font20 padding1em centerText">{this.state.error}</p>
                </div>
              : null
              }
            </div>
          }
          <form className="supportForm" onSubmit={this.handleSubmit}>
            <input
              className="supportFormInput"
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleName} />
            <input
              className="supportFormInput"
              placeholder="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmail}
              required />
            <input
              className="supportFormInput"
              placeholder="Subject"
              type="text"
              value={this.state.subject}
              onChange={this.handleSubject} />
            <textarea
              className="vh25 supportFormInput"
              placeholder="Body"
              type="text"
              value={this.state.body}
              onChange={this.handleBody} />
            <input
              className="supportFormButton"
              type="submit"
              value="HIT US UP" />
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect()(Support)
