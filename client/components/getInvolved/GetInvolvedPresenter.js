import React from 'react'
import { Link } from 'react-router-dom'
import { FooterPresenter } from '../'
const Io = require('react-icons/lib/io')

const GetInvolvedPresenter = () => (
  <div className="getInvolvedBackgroundImage">
    <p className="mobileHeader">GET INVOLVED</p>
    <div className="getInvolvedHeaderDiv">
      <p className="getInvolvedHeader">YOU HAVE A PLACE<br />ON OUR TEAM</p>
      <p className="getInvolvedHeaderQuote">For as in one body we have many parts, and all the parts do not have the same function, so we, though many, are one body in Christ and individually parts of one another.<br /><br />Romans 12:4-5</p>
    </div>
    <div className="getInvolvedAngelInvestorDiv" id="angel-investor">
      <div className="displayFlex flexColumn flex3">
        <p className="getInvolvedAngelInvestorTitle">ANGEL INVESTORS</p>
        <p className="getInvolvedAngelInvestorBody">We rely on a highly-valued team of Angel Investors to support Ora's mission to help people cultivate lives of devotion. Angel Investors donate on a recurring monthly basis, and form the first line of support for direction and decision making within the organization.</p>
      </div>
      <div className="displayFlex flexColumn flex1 flexJustifyEnd">
        <a href="/donor-signup#navbar" className="getInvolvedWhiteLink">
          DONATE
          <Io.IoChevronRight className="iconMarginLeft" />
        </a>
      </div>
    </div>
    <div className="getInvolvedReviewDiv" id="review">
      <div className="displayFlex flexColumn flex3">
        <p className="getInvolvedReviewTitle">RATE & REVIEW US IN THE APP STORE</p>
        <p className="getInvolvedReviewBody">If you like the app, please consider rating it and writing a review in the App Store. Your feedback helps spread the word and get more people involved.</p>
      </div>
      <div className="displayFlex flexColumn flex1 flexJustifyEnd">
        <a href="https://itunes.apple.com/us/app/ora-prayer-network/id1354049056?mt=8" className="getInvolvedWhiteLink">
          REVIEW
          <Io.IoChevronRight className="iconMarginLeft" />
        </a>
      </div>
    </div>
    <div className="getInvolvedProposeDiv" id="propose">
      <div className="displayFlex flexColumn flex3">
        <p className="getInvolvedProposeTitle">PROPOSE FUTURE PROJECTS</p>
        <p className="getInvolvedProposeBody">We love when people in the Ora Prayer Network propose ideas for new projects or features. We're an eager, collaborative team, so we hope to hear from you soon.</p>
      </div>
      <div className="displayFlex flexColumn flex1 flexJustifyEnd">
        <Link to="/project-proposal" className="getInvolvedWhiteLink">
          SUBMIT
          <Io.IoChevronRight className="iconMarginLeft" />
        </Link>
      </div>
    </div>
    <div className="getInvolvedClosingDiv">
      <p className="getInvolvedClosingQuote">I urge you therefore, brothers, by the mercies of God, to offer your bodies as a living sacrifice, holy and pleasing to God, your spiritual worship.<br /><br />Do not conform yourselves to this age but be transformed by the renewal of your mind, that you may discern what is the will of God, what is good and pleasing and perfect.<br /><br />Romans 12:1-2</p>
    </div>
    <FooterPresenter />
  </div>
)

export default GetInvolvedPresenter

/**
<div className="getInvolvedSubHeaderBackground">
  <div className="getInvolvedSubHeaderDiv">
    <div className="displayFlex flexColumn">
      <p className="getInvolvedSubHeaderTitle">GET INVOLVED</p>
      <p className="getInvolvedSubHeaderBody">There are many ways to get involved with Ora. Become part of a strong, close-knit team.</p>
    </div>
    <div className="displayFlex flexColumn">
      <a href="/get-involved#angel-investor" className="getInvolvedSubHeaderLink">
        BECOME AN ANGEL INVESTOR
        <Io.IoChevronRight className="iconMarginLeft" />
      </a>
      <a href="/get-involved#missionary" className="getInvolvedSubHeaderLink">
        BECOME AN ORA MISSIONARY
        <Io.IoChevronRight className="iconMarginLeft" />
      </a>
      <a href="/get-involved#blog" className="getInvolvedSubHeaderLink">
        WRITE FOR OUR BLOG
        <Io.IoChevronRight className="iconMarginLeft" />
      </a>
      <a href="/get-involved#propose" className="getInvolvedSubHeaderLink">
        PROPOSE A PROJECT
        <Io.IoChevronRight className="iconMarginLeft" />
      </a>
    </div>
  </div>
</div>

<div className="getInvolvedMissionaryDiv" id="missionary">
  <div className="displayFlex flexColumn flex3">
    <p className="getInvolvedMissionaryTitle">ORA MISSIONARIES</p>
    <p className="getInvolvedMissionaryBody">Ora missionaries are people who are committed to our mission and who want to help us grow. They share Ora with their friends, families, and communities, support our grassroots marketing efforts, and help us reach people we never could on our own.</p>
  </div>
  <div className="displayFlex flexColumn flex1 flexJustifyEnd">
    <p className="raleway font14 bottomMarginHalfem">The Ora Missionary Program is still in development and will be available soon</p>
  </div>
</div>
<div className="getInvolvedBlogDiv" id="blog">
  <div className="displayFlex flexColumn flex3">
    <p className="getInvolvedBlogTitle">BLOG WRITERS</p>
    <p className="getInvolvedBlogBody">We're always looking for quality writing for our blog. The blog is a collection of essays on prayer, theology, and devotional life. If you have an essay you'd like to submit for consideration, please fill out our submission form.</p>
  </div>
  <div className="displayFlex flexColumn flex1 flexJustifyEnd">
    <p className="raleway font14 bottomMarginHalfem">The Ora Blog is still in development and will be available soon</p>
  </div>
</div>
**/
