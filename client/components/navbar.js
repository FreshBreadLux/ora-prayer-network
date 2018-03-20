import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      revealedNavbar: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.hideNavbar = this.hideNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({revealedNavbar: !this.state.revealedNavbar})
  }

  hideNavbar() {
    this.setState({revealedNavbar: false})
  }

  render() {
    return (
      <div>
        <nav>
          <div className="menuButtonDiv">
            <a className="raleway" href="#" onClick={this.toggleNavbar}>MENU</a>
          </div>
          <div className={this.state.revealedNavbar ? 'revealedNavbar' : 'hiddenNavbar'}>
            <Link to="/home" onClick={this.hideNavbar}>HOME</Link>
            <Link to="/about" onClick={this.hideNavbar}>ABOUT</Link>
            <Link to="/get-involved" onClick={this.hideNavbar}>GET INVOLVED</Link>
            <Link to="/support" onClick={this.hideNavbar}>SUPPORT</Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default connect()(Navbar)
