import React from 'react'
import ReactEmoji from 'react-emoji'

const CupOfJoePresenter = ({ buyCoffee }) => (
  <div>
    <div className="displayFlex bottomMarginHalfem topMargin1em">
      <p className="raleway font20">BUY US A CUP OF JOE</p>
    </div>
    <div className="cupOfJoeDiv">
      <div className="displayFlex flexJustifyStart">
        <p className="font16 bottomMarginHalfem">
          <span className="emojiSpan">
            {`We love coffee`}{ReactEmoji.emojify(':blush:', {attributes: {width: '14px', height: '14px', className: 'leftMarginHalfem'}})}
          </span>
        </p>
      </div>
      <p className="font14 bottomMargin1em">We're probably working in a coffee shop right now...</p>
      <div className="displayFlex widthPercent65 alignSelfCenter">
        <button
          onClick={buyCoffee}
          className="supportPlanButton">
          <span className="emojiSpan">
            {ReactEmoji.emojify(':coffee:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`DONATE $3`}
          </span>
        </button>
      </div>
    </div>
  </div>
)

export default CupOfJoePresenter
