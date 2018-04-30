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
            "It was not you who chose me, but I who chose you
            <br />
            and appointed you to go and bear fruit that will remain,
            <br />
            so that whatever you ask the Father in my name He may give you.
            <br />
            This I command you: love one another."
            <br /><br />
          </p>
          <p className="rightText">- John 15:16-17</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
