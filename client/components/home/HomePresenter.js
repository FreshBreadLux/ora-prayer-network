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
            When he disembarked and saw the vast crowd,
            <br />
            his heart was moved with pity for them,
            <br />
            for they were like sheep without a shepherd;
            <br />
            and he began to teach them many things.
            <br /><br />
          </p>
          <p className="rightText">- Mark 6:34</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
