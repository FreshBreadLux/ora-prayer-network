import React from 'react'
import ReactEmoji from 'react-emoji'
import Loader from 'react-loader-spinner'

const CupOfJoePresenter = ({ buyCoffee, coffeeStatus }) => (
  <div>
    <div className="displayFlex bottomMarginHalfem topMargin1em">
      <p className="raleway font20">BUY US A CUP OF JOE</p>
    </div>
    <div className="cupOfJoeDiv">
      <div className="displayFlex flexJustifyStart">
        <p className="font16 bottomMarginHalfem">We love coffee</p>
      </div>
      <p className="font14 bottomMargin1em">We're probably working in a coffee shop right now...</p>
      <div className="displayFlex widthPercent65 alignSelfCenter">
        <button
          onClick={buyCoffee}
          className="supportPlanButton">
          {coffeeStatus === 'ready'
          ? <span className="emojiSpan fadeIn">
              {ReactEmoji.emojify(':coffee:', {attributes: {width: '14px', height: '14px', className: 'rightMarginHalfem'}})}{`DONATE $3`}
            </span>
          : <div>
              {coffeeStatus === 'loading'
              ? <Loader type="Bars" height={12} width={12} color="#555" />
              : <span className="emojiSpan fadeInAndOut">
                  {`THANK YOU`}{ReactEmoji.emojify(':smile:', {attributes: {width: '14px', height: '14px', className: 'leftMarginHalfem'}})}
                </span>
              }
            </div>
          }

        </button>
      </div>
    </div>
  </div>
)

export default CupOfJoePresenter
