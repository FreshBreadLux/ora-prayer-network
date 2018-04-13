import React from 'react'
import { NavbarLinkPresenter } from '../'
const Io = require('react-icons/lib/io')

const NavbarPresenter = ({ revealedNavbar, toggleNavbar, manageNavigation }) => (
  <div>
    <nav>
      <div className="menuButtonDiv">
        <a className="displayFlex flexJustifyBetween raleway" href="#" onClick={() => {
          console.log('link worked')
          toggleNavbar()
          console.log('toggleNavbar fired')
          }}>
          MENU
          <Io.IoChevronRight
            className={revealedNavbar
            ? 'menuChevronDown'
            : 'menuChevronRight'} />
        </a>
      </div>
      <div className={revealedNavbar ? 'revealedNavbar' : 'hiddenNavbar'}>
        <NavbarLinkPresenter
          path="/home"
          manageNavigation={manageNavigation}>
          <Io.IoIosHome className="navIcon" />
          <p className="navLinkText">HOME</p>
        </NavbarLinkPresenter>
        <NavbarLinkPresenter
          path="/about"
          manageNavigation={manageNavigation}>
          <Io.IoIosInformation className="navIcon" />
          <p className="navLinkText">ABOUT</p>
        </NavbarLinkPresenter>
        <NavbarLinkPresenter
          path="/support"
          manageNavigation={manageNavigation}>
          <Io.IoIosMedical className="navIcon" />
          <p className="navLinkText">HELP</p>
        </NavbarLinkPresenter>
        <NavbarLinkPresenter
          path="/get-involved"
          manageNavigation={manageNavigation}>
          <Io.IoIosWorld className="navIcon" />
          <p className="navLinkText">GET INVOLVED</p>
        </NavbarLinkPresenter>
        <NavbarLinkPresenter
          path="/donor-signup"
          manageNavigation={manageNavigation}>
          <Io.IoIosPeople className="navIcon" />
          <p className="navLinkText">DONOR SIGNUP</p>
        </NavbarLinkPresenter>
        <NavbarLinkPresenter
          heart="Heart"
          path="/manage-my-donations"
          manageNavigation={manageNavigation}>
          <Io.IoIosHeart className="navIcon" />
          <p className="navLinkText">MY DONATIONS</p>
        </NavbarLinkPresenter>
      </div>
    </nav>
  </div>
)

export default NavbarPresenter
