import React from 'react'
import { connect } from 'react-redux'
import Footer from './footer'

const About = () => (
  <div className="aboutBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAlignCenter">
      <img src="images/screenshot-home-screen.png" className="screenshot" />
      <h2 className="raleway centerText padding1em">ORA STRENGTHENS PEOPLE'S FAITH AND DEVOTIONAL LIVES</h2>
      <img src="images/download-on-the-app-store.svg" />
      <div className="aboutMainBlurbDiv">
        <p className="aboutText">At Ora, we want to help strengthen people's faith by reminding them of the beauty of the One, Holy, Catholic, and Apostolic Church.
        <br /><br />
        Ora's mobile app allows you to accept and submit anonymous prayer requests, follow prayer requests, and set daily reminders to pray.
        <br /><br />
        Ora has two primary goals: to give support to people struggling with burdens, and to encourage people to actively participate in the Body of Christ by taking time out of their day to pray for their brothers and sisters in need.
        <br /><br />
        We hope that Ora will help people develop a deeper and more personal relationship with God.</p>
      </div>
      <div className="aboutBlurbDiv">
        <img src="images/screenshot-submit-screen.png" className="screenshot" />
        <div className="aboutSubBlurbDiv">
          <h2 className="raleway bottomMargin1em">SUBMIT PRAYERS TO THE ORA PRAYER NETWORK</h2>
          <p className="aboutText">We are called to lay our burdens down before God.
          <br /><br />
          When you submit an anonymous prayer, you are surrendering your intention to God and to the Church. You can find peace being reminded that you have the support of your brothers and sisters, and that God's love is always at work in your life.</p>
        </div>
      </div>
      <div className="aboutBlurbDiv">
        <div className="aboutSubBlurbDiv">
          <h2 className="raleway bottomMargin1em">PRAY FOR THE INTENTIONS OF OTHERS</h2>
          <p className="aboutText">We are brothers and sisters in Christ.
          <br /><br />
          Draw closer to your Lord through the intentions of others. Accepting the prayers of others is a selfless act that can help us deepen our relationship with God. Develop a habit of reflective prayer and a spirit of true empathy.</p>
        </div>
        <img src="images/screenshot-accept-screen.png" className="extraScreenshot" />
      </div>
      <div className="aboutBlurbDiv">
        <img src="images/screenshot-follow-screen.png" className="screenshot" />
        <div className="aboutSubBlurbDiv">
          <h2 className="raleway bottomMargin1em">FOLLOW PRAYERS TO CONTINUE PRAYING AND TO RECEIVE UPDATES</h2>
          <p className="aboutText">We show our unity in prayer.
          <br /><br />
          After you accept a prayer, you'll have the option to follow it. Following a prayer allows you to revisit the intention and continue praying for it. It also allows you to receive updates about the prayer request, if the author chooses to share them.</p>
        </div>
      </div>
      <div className="aboutBlurbDiv">
        <div className="aboutSubBlurbDiv">
          <h2 className="raleway bottomMargin1em">SET DAILY REMINDERS TO HELP YOU CULTIVATE A LIFE OF PRAYER</h2>
          <p className="aboutText">We persevere in prayer.
          <br /><br />
          Set daily reminders to accept new prayers from the Ora Prayer Network, to pray for prayers you have followed, or to pray for your personal intentions. Only in God can we find true peace, and Ora wants to help you develop the habit of turning to Him every day.</p>
        </div>
        <img src="images/screenshot-reminder-screen.png" className="extraScreenshot" />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  </div>
)

export default connect()(About)
