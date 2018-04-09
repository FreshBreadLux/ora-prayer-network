import React from 'react'
import { connect } from 'react-redux'
import NavbarLinkPresenter from './navbarLinkPresenter'
const Io = require('react-icons/lib/io')

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      revealedNavbar: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.manageNavigation = this.manageNavigation.bind(this)
  }

  toggleNavbar() {
    this.setState({revealedNavbar: !this.state.revealedNavbar})
  }

  manageNavigation() {
    this.setState({
      revealedNavbar: false
    })
  }

  render() {
    return (
      <div>
        <nav>
          <div className="menuButtonDiv">
            <a className="displayFlex flexJustifyBetween raleway" href="#" onClick={this.toggleNavbar}>
              MENU
              <Io.IoChevronRight
                className={this.state.revealedNavbar
                ? 'menuChevronDown'
                : 'menuChevronRight'} />
            </a>
          </div>
          <div className={this.state.revealedNavbar ? 'revealedNavbar' : 'hiddenNavbar'}>
            <NavbarLinkPresenter
              path="/home"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosHome className="navIcon" />
              <p className="navLinkText">HOME</p>
            </NavbarLinkPresenter>
            <NavbarLinkPresenter
              path="/about"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosInformation className="navIcon" />
              <p className="navLinkText">ABOUT</p>
            </NavbarLinkPresenter>
            <NavbarLinkPresenter
              path="/support"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosMedical className="navIcon" />
              <p className="navLinkText">HELP</p>
            </NavbarLinkPresenter>
            <NavbarLinkPresenter
              path="/get-involved"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosWorld className="navIcon" />
              <p className="navLinkText">GET INVOLVED</p>
            </NavbarLinkPresenter>
            <NavbarLinkPresenter
              path="/donor-signup"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosPeople className="navIcon" />
              <p className="navLinkText">DONOR SIGNUP</p>
            </NavbarLinkPresenter>
            <NavbarLinkPresenter
              heart="Heart"
              path="/manage-my-donations"
              manageNavigation={this.manageNavigation}>
              <Io.IoIosHeart className="navIcon" />
              <p className="navLinkText">MY DONATIONS</p>
            </NavbarLinkPresenter>
          </div>
        </nav>
      </div>
    )
  }
}

export default connect()(Navbar)
