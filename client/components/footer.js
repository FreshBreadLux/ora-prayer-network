import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="padding1em displayFlex flexColumn flexAllCenter">
    <p className="raleway bottomMargin1em">ORA PRAYER NETWORK</p>
    <Link className="raleway font12" to="/privacy-policy">Privacy Policy</Link>
  </div>
)

export default connect()(Footer)
