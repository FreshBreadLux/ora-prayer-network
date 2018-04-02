import React from 'react'
import axios from 'axios'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
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

  render() {
    console.log('login state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1">
        <div className="displayFlex flexColumn flex1 flexAlignCenter">
          <p className="raleway font16">{this.state.error}</p>
          <form onSubmit={this.handleSubmit} className="topMargin1em">
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway font20">EMAIL</label>
              <div className="displayFlex">
                <input
                  type="email"
                  name="email"
                  inputMode="email"
                  placeholder="Email"
                  className="donateInputLine"
                  onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="lineItemDiv bottomMargin1em">
              <label className="raleway font20">PASSWORD</label>
              <div className="displayFlex">
                <input
                  type="password"
                  name="password"
                  inputMode="text"
                  placeholder="Password"
                  className="donateInputLine"
                  onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="displayFlex flexJustifyCenter">
              <button className="supportPlanButton" type="submit">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
