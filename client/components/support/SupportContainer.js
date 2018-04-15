import React from 'react'
import axios from 'axios'
import { SupportPresenter } from '../'
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
      error: null,
      isLoading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    axios.post(`${ROOT_URL}/api/formEmails?form=support`, {
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
      confirmation: confirmation.data,
      isLoading: false,
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
        isLoading={this.state.isLoading}
        handleSubmit={this.handleSubmit}
        confirmation={this.state.confirmation}
        handleInputChange={this.handleInputChange} />
    )
  }
}

export default SupportContainer
