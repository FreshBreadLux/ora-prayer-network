import React from 'react'
import axios from 'axios'
import { LoginPagePresenter } from '../'
import { ROOT_URL } from '../../config'

class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: null,
      checkEmailReturned: false,
      userExists: false,
      stripeCustomerExists: false,
    }
    this.checkEmail = this.checkEmail.bind(this)
    this.setInputRef = this.setInputRef.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  checkEmail() {
    if (this.state.email) {
      axios.get(`${ROOT_URL}/api/users?email=${this.state.email}`)
      .then(response => {
        if (response.data.id && response.data.stripeCustomerId) {
          this.setState({ checkEmailReturned: true, userExists: true, stripeCustomerExists: true })
        } else if (response.data.id) {
          this.setState({ checkEmailReturned: true, userExists: true, stripeCustomerExists: false })
          this.password.focus()
        } else {
          this.setState({ checkEmailReturned: true, userExists: false, stripeCustomerExists: false })
          this.password.focus()
        }
      })
      .catch(console.error)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.email && this.state.password) {
      axios.post(`${ROOT_URL}/api/users/sessions`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => JSON.stringify(response.data))
      .then(oraAuth => localStorage.setItem('oraAuth', oraAuth))
      .then(() => this.props.verifyLogin())
      .catch(error => this.setState({error: error.response.data}))
    } else {
      this.setState({ error: 'Please provide both an email and a password' })
    }
  }

  setInputRef(ref, name) {
    this[name] = ref
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) this.password.focus()
  }

  render() {
    return (
      <LoginPagePresenter
        email={this.state.email}
        error={this.state.error}
        checkEmail={this.checkEmail}
        setInputRef={this.setInputRef}
        password={this.state.password}
        handleSubmit={this.handleSubmit}
        handleKeyDown={this.handleKeyDown}
        handleInputChange={this.handleInputChange}
        checkEmailReturned={this.state.checkEmailReturned}
        stripeCustomerExists={this.state.stripeCustomerExists} />
    )
  }
}

export default LoginPageContainer
