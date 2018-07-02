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
            When the sabbath came he began to teach in the synagogue,
            <br />
            and many who heard him were astonished.
            <br />
            They said, “Where did this man get all this?
            <br />
            What kind of wisdom has been given him?
            <br />
            What mighty deeds are wrought by his hands!"
            <br /><br />
          </p>
          <p className="rightText">- Mark 5:2</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
