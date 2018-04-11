import React from 'react'
import ReactEmoji from 'react-emoji'
import FormInputPresenter from './formInputPresenter'
import Loader from 'react-loader-spinner'
const Io = require('react-icons/lib/io')

const SingleDonationPresenter = ({ singleDonation, handleInputChange, chargeSingleDonation, singleDonationStatus }) => (
  <div>
    <p className="supportPlanHeader">MAKE A SINGLE DONATION</p>
    <p className="supportPlanSubHeader">Single donations are charged to your card on file and are independent of your monthly support plan</p>
    <FormInputPresenter
      type="text"
      inputMode="text"
      name="singleDonation"
      value={singleDonation}
      label="Single Donation"
      onChange={handleInputChange}
      notEmpty={!!singleDonation.length} />
    <div className="displayFlex flexAllCenter">
      <button
        onClick={chargeSingleDonation}
        disabled={!singleDonation.length}
        className="supportPlanDonateButton">
        {singleDonationStatus === 'ready'
        ? <div>
            {singleDonation.length
            ? <div className="displayFlex flexAllCenter">
                <Io.IoIosHeart className="iconMarginRight font16 pinkText" />
                <p className="raleway font14">DONATE</p>
              </div>
            : <div className="displayFlex flexAllCenter">
                <Io.IoIosHeartOutline className="iconMarginRight font16" />
                <p className="raleway font14">DONATE</p>
              </div>
            }
          </div>
        : <div>
            {singleDonationStatus === 'loading'
            ? <Loader type="Bars" height={12} width={12} color="#555" />
            : <span className="emojiSpan fadeInAndOut">
                <p className="raleway font14">THANK YOU</p>{ReactEmoji.emojify(':blush:', {attributes: {width: '16px', height: '16px', className: 'leftMarginHalfem'}})}
              </span>
            }
          </div>
        }
      </button>
    </div>
  </div>
)

export default SingleDonationPresenter
