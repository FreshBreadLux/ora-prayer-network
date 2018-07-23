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
            When they had had their fill, he said to his disciples,
            <br />
            "Gather the fragments left over,
            <br />
            so that nothing will be wasted."
            <br />
            So they collected them,
            <br />
            and filled twelve wicker baskets with fragments
            <br />
            from the five barley loaves
            <br />
            that had been more than they could eat.
            <br /><br />
          </p>
          <p className="rightText">- John 6:12-13</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
