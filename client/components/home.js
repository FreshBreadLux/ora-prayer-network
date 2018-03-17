import React from 'react'
import { connect } from 'react-redux'
import Footer from './footer'

const Home = () => (
  <div className="vh90 displayFlex flexColumn">
    <h1 className="raleway font100 centerText paddingHalfem">ORA</h1>
    <div className="flex1 flexJustifyCenter flexAlignStart">
      <text className="gospelText ebgaramond vw25">"I am troubled now. Yet what should I say?<br />Father, save me from this hour'?<br />But it was for this purpose that I came to this hour.<br />Father, glorify your name."<br />- John 12:27-28</text>
    </div>
    <div>
      <Footer />
    </div>
  </div>
)

export default connect()(Home)
