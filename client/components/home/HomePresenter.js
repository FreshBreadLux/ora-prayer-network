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
            "I am the good shepherd,
            <br />
            and I know mine and mine know me,
            <br />
            just as the Father knows me and I know the Father;
            <br />
            and I will lay down my life for the sheep."
            <br /><br />
          </p>
          <p className="rightText">- John 10:14-15</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
