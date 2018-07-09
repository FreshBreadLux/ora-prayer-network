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
            In love He destined us for adoption to Himself through Jesus Christ,
            <br />
            in accord with the favor of His will,
            <br />
            for the praise of the glory of His grace
            <br />
            that He granted us in the beloved.
            <br /><br />
          </p>
          <p className="rightText">- Eph 1:5-6</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
