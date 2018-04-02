import React from 'react'
import LoginPage from './loginPage'
import LoadingPresenter from './loadingPresenter'
import ManageMyDonationsContainer from './manageMyDonationsContainer'

class CheckLoggedInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      userId: null,
      jwToken: null,
    }
    this.verifyLogin = this.verifyLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.verifyLogin()
  }

  verifyLogin() {
    const oraAuth = localStorage.getItem('oraAuth')
    const oraAuthJson = JSON.parse(oraAuth)
    if (oraAuthJson) {
      this.setState({
        isLoading: false,
        isLoggedIn: true,
        userId: oraAuthJson.userId,
        jwToken: oraAuthJson.jwToken
      })
    } else {
      this.setState({ isLoading: false })
    }
  }

  logout(){
    localStorage.removeItem('oraAuth')
    this.setState({
      isLoading: false,
      isLoggedIn: false,
      userId: null,
      jwToken: null
    })
  }

  render() {
    console.log('this.state: ', this.state)
    return (
      <div className="displayFlex flexColumn flex1">
      {this.state.isLoading
      ? <LoadingPresenter />
      : <div className="displayFlex flexColumn flex1">
          {!this.state.isLoggedIn
          ? <LoginPage verifyLogin={this.verifyLogin} />
          : <ManageMyDonationsContainer
              logout={this.logout}
              userId={this.state.userId}
              jwToken={this.state.jwToken} />
          }
        </div>
      }
      </div>
    )
  }
}

export default CheckLoggedInContainer
