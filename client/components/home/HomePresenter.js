import React from 'react'
import { connect } from 'react-redux'
import { FooterPresenter } from '../'

const HomePresenter = () => (
  <div className="homeBackgroundImage">
    <div className="mainHomeDiv">
      <p className="raleway font100 centerText paddingHalfem">ORA</p>
      <div className="homeScriptureDiv">
        <div className="homeScriptureQuote">
          <p>
            "If you remain in me and my word remains in you,
            <br />
            ask for whatever you want and it will be done for you.
            <br />
            By this is my Father glorified,
            <br />
            that you bear much fruit and become my disciples."
            <br /><br />
          </p>
          <p className="rightText">- John 15:7-8</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
