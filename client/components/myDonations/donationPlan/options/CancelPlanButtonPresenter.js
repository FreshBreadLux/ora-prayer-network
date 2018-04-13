import React from 'react'
import { LoadingButtonPresenter } from '../../../'
const Io = require('react-icons/lib/io')

const CancelPlanButtonPresenter = ({ toggleStateField, cancelButtonRevealed, isLoading, cancelSubscription }) => (
  <div>
    <button
      className="supportPlanOptionsButton width170Pixels flexJustifyBetween"
      onClick={() => toggleStateField('cancelButtonRevealed')}>
      CANCEL SUPPORT PLAN
      <Io.IoChevronRight className={cancelButtonRevealed
      ? 'menuChevronDown'
      : 'menuChevronRight'} />
    </button>
    <div className={cancelButtonRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
      <div className="displayFlex flexColumn flexAlignCenter">
        <p className="font12">Are you sure you want to cancel your donation plan?</p>
        <LoadingButtonPresenter
          color="#555"
          dimensions={12}
          isLoading={isLoading}
          onClick={cancelSubscription}
          classNameProp="supportPlanOptionsButton displayFlex flexJustifyCenter">
          <div className="displayFlex flexAllCenter">
            <Io.IoIosCloseOutline className="iconMarginRight font16 redText" />
            <p className="font16 redText">CANCEL</p>
          </div>
        </LoadingButtonPresenter>
      </div>
    </div>
  </div>
)

export default CancelPlanButtonPresenter
