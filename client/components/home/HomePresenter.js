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
            Jesus said to them again, "Peace be with you.
            <br />
            As the Father has sent me, so I send you."
            <br />
            And when he had said this, he breathed on them and said to them,
            <br />
            "Receive the Holy Spirit.
            <br />
            Whose sins you forgive are forgiven them,
            <br />
            and whose sins you retain are retained."
            <br /><br />
          </p>
          <p className="rightText">- John 20:21-23</p>
        </div>
      </div>
    </div>
    <FooterPresenter />
  </div>
)

export default connect()(HomePresenter)
