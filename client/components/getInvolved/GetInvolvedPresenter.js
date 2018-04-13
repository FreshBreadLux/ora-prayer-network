import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../footer'

const GetInvolvedPresenter = () => (
  <div className="getInvolvedBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAllCenter">
      <p className="raleway font30 centerText bottomMargin1em topMargin1em">BECOME AN ANGEL INVESTOR</p>
      <Link to="/donor-signup" className="getInvolvedButton">DONATE</Link>
      <hr className="getInvolvedDivider" />
      <p className="raleway font30 centerText bottomMargin1em topMargin1em">BECOME AN ORA MISSIONARY</p>
      <Link to="/donate" className="getInvolvedButton">SHARE ORA</Link>
      <hr className="getInvolvedDivider" />
      <p className="raleway font30 centerText bottomMargin1em topMargin1em">WRITE FOR THE ORA BLOG</p>
      <Link to="/donate" className="getInvolvedButton">SUBMIT AN ESSAY</Link>
      <hr className="getInvolvedDivider" />
      <p className="raleway font30 centerText bottomMargin1em topMargin1em">PROPOSE FUTURE PROJECTS FOR ORA</p>
      <Link to="/donate" className="getInvolvedButton">SUBMIT A PROPOSAL</Link>
    </div>
    <Footer />
  </div>
)

export default connect()(GetInvolvedPresenter)
