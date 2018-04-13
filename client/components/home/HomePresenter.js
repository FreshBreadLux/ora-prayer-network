import React from 'react'
import { connect } from 'react-redux'
import Footer from '../Footer'

const HomePresenter = () => (
  <div className="homeBackgroundImage">
    <div className="mainHomeDiv">
      <p className="raleway font100 centerText paddingHalfem">ORA</p>
      <div className="homeScriptureDiv">
        <div className="homeScriptureQuote">
          <p>"I am troubled now. Yet what should I say?<br />Father, save me from this hour'?<br />But it was for this purpose that I came to this hour.<br />Father, glorify your name."
        <br /><br /></p>
        <p className="rightText">- John 12:27-28</p>
      </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default connect()(HomePresenter)
