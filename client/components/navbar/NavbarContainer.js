import React from 'react'
import { NavbarPresenter } from '../'

class NavbarContainer extends React.Component {
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
      <NavbarPresenter
        toggleNavbar={this.toggleNavbar}
        manageNavigation={this.manageNavigation}
        revealedNavbar={this.state.revealedNavbar} />
    )
  }
}

export default NavbarContainer
