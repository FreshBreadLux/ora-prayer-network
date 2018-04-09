import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLinkPresenter = ({ path, manageNavigation, children, heart = '' }) => (
  <Link
    to={path}
    onClick={manageNavigation}
    className={window.location.pathname === path ? `navLinkActive${heart}` : 'navLink'}>
    {children}
  </Link>
)

export default NavbarLinkPresenter
