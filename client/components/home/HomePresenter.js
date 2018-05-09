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
            So then the Lord Jesus, after he spoke to them,
            <br />
            was taken up into heaven
            <br />
            and took his seat at the right hand of God.
            <br />
            But they went forth and preached everywhere,
            <br />
            while the Lord worked with them
            <br />
            and confirmed the word through accompanying signs.
            <br /><br />
          </p>
          <p className="rightText">- Mark 16:19-20</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
