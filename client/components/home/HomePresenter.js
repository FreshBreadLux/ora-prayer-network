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
            While they were eating,
            <br />
            he took bread, said the blessing,
            <br />
            broke it, gave it to them, and said,
            <br />
            "Take it; this is my body."
            <br /><br />
          </p>
          <p className="rightText">- Mark 14:22</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
