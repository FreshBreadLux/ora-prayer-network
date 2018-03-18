import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <div>
    <nav>
      <div className="displayFlex flexAllCenter vh10">
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/get-involved">GET INVOLVED</Link>
        <Link to="/support">SUPPORT</Link>
      </div>
    </nav>
  </div>
)

export default connect()(Navbar)
