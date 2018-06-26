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
            The woman, realizing what had happened to her,
            <br />
            approached in fear and trembling.
            <br />
            She fell down before Jesus and told him the whole truth.
            <br />
            He said to her, "Daughter, your faith has saved you.
            <br />
            Go in peace and be cured of your affliction."
            <br /><br />
          </p>
          <p className="rightText">- Mark 5:33-34</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
