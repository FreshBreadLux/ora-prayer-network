import React from 'react'
import { connect } from 'react-redux'
import { setAuthInfo } from '../store'
import LoginPageContainer from './loginPageContainer'
import MyDonationsContainer from './MyDonationsContainer'

class CheckLoggedInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.verifyLogin = this.verifyLogin.bind(this)
  }

  componentDidMount() {
    this.verifyLogin()
  }

  verifyLogin() {
    const oraAuth = localStorage.getItem('oraAuth')
    const oraAuthJson = JSON.parse(oraAuth)
    if (oraAuthJson) {
      this.props.dispatchSetAuthInfo({
        isLoggedIn: true,
        userId: oraAuthJson.userId,
        jwToken: oraAuthJson.jwToken,
      })
    }
  }

  render() {
    return (
      <div className="displayFlex flexColumn flex1">
        {!this.props.isLoggedIn
        ? <LoginPageContainer verifyLogin={this.verifyLogin} />
        : <MyDonationsContainer />
        }
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatch = dispatch => ({
  dispatchSetAuthInfo: authInfo => dispatch(setAuthInfo(authInfo)),
})

export default connect(mapState, mapDispatch)(CheckLoggedInContainer)
