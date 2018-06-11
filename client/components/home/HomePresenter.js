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
            He said, “To what shall we compare the kingdom of God,
            <br />
            or what parable can we use for it?
            <br />
            It is like a mustard seed that, when it is sown in the ground,
            <br />
            is the smallest of all the seeds on the earth.
            <br />
            But once it is sown, it springs up and becomes the largest of plants"
            <br /><br />
          </p>
          <p className="rightText">- Mark 4:30-32</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
