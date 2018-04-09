import React from 'react'
import { Link } from 'react-router-dom'
import { IoChevronRight } from 'react-icons/lib/io'
import Footer from './footer'

const ThankYou = () => (
  <div className="thankYouBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAlignCenter">
      <p className="raleway font30 centerText paddingHalfem paddingTop2em">THANK YOU</p>
      <p className="raleway font20 centerText paddingHalfem paddingBottom2em">AND WELCOME TO THE TEAM</p>
      <div className="displayFlex flexAllCenter padding1em">
        <Link to="/manage-my-donations" className="thankYouPageButton">
          <div className="displayFlex flexAlignCenter flexJustifyBetween">
            <p>MANAGE MY DONATIONS</p>
            <IoChevronRight />
          </div>
        </Link>
      </div>
      <div className="displayFlex flexAllCenter padding1em">
        <Link to="/home" className="thankYouPageButton">
          <div className="displayFlex flexAlignCenter flexJustifyBetween">
            <p>HOME</p>
            <IoChevronRight />
          </div>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
)

export default ThankYou
