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
            "Your ancestors ate the manna in the desert, but they died;
            <br />
            this is the bread that comes down from heaven
            <br />
            so that one may eat it and not die.
            <br />
            I am the living bread that came down from heaven;
            <br />
            whoever eats this bread will live forever;
            <br />
            and the bread that I will give is my flesh for the life of the world."
            <br /><br />
          </p>
          <p className="rightText">- John 6:49-51</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
