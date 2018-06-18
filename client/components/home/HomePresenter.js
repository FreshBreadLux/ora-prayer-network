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
            But they answered her,
            <br />
            "There is no one among your relatives who has this name."
            <br />
            So they made signs, asking his father what he wished him to be called.
            <br />
            He asked for a tablet and wrote, "John is his name,"
            <br />
            and all were amazed.
            <br />
            Immediately his mouth was opened, his tongue freed,
            <br />
            and he spoke blessing God.
            <br /><br />
          </p>
          <p className="rightText">- Luke 1:61-64</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
