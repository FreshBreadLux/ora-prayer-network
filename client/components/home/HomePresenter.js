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
            Then Jesus approached and said to them,
            <br />
            "All power in heaven and on earth has been given to me.
            <br />
            Go, therefore, and make disciples of all nations,
            <br />
            baptizing them in the name of the Father,
            <br />
            and of the Son, and of the Holy Spirit,
            <br />
            teaching them to observe all that I have commanded you.
            <br />
            And behold, I am with you always, until the end of the age."
            <br /><br />
          </p>
          <p className="rightText">- Matthew 28:18-20</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
