import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <div>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/get-involved">Get Involved</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/support">Support</Link>
      </div>
    </nav>
  </div>
)

export default connect()(Navbar)
