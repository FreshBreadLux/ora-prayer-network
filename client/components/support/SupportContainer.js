import React from 'react'
import axios from 'axios'
import SupportPresenter from './SupportPresenter'
import { ROOT_URL } from '../../config'

class SupportContainer extends React.Component {
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
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post(`${ROOT_URL}/api/support`, {
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

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <SupportPresenter
        name={this.state.name}
        body={this.state.body}
        email={this.state.email}
        error={this.state.error}
        subject={this.state.subject}
        handleSubmit={this.handleSubmit}
        confirmation={this.state.confirmation}
        handleInputChange={this.handleInputChange} />
    )
  }
}

export default SupportContainer
