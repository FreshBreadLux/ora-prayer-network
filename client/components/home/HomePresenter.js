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
            "If a kingdom is divided against itself,
            <br />
            that kingdom cannot stand.
            <br />
            And if a house is divided against itself,
            <br />
            that house will not be able to stand."
            <br /><br />
          </p>
          <p className="rightText">- Mark 3:24-25</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
