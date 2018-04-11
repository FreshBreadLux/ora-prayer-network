import React from 'react'
import LoadingButtonPresenter from './loadingButtonPresenter'
import FormInputPresenter from './formInputPresenter'
const Io = require('react-icons/lib/io')

const NewPlanButtonPresenter = ({ toggleStateField, startNewPlanRevealed, startNewPlanAmount, handleInputChange, isLoading, startNewSubscription }) => (
  <div>
    <button
      className="supportPlanOptionsButton width170Pixels flexJustifyBetween"
      onClick={() => toggleStateField('startNewPlanRevealed')}>
      START NEW PLAN
      <Io.IoChevronRight className={startNewPlanRevealed
      ? 'menuChevronDown'
      : 'menuChevronRight'} />
    </button>
    <div className={startNewPlanRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
      <div className="displayFlex flexColumn bottomMargin1em">
      <p className="font12 bottomMargin1em">Your first monthly donation will occur immediately</p>
        <div className="displayFlex flexJustifyBetween flexAlignCenter">
          <FormInputPresenter
            step="0.01"
            type="number"
            inputMode="number"
            name="startNewPlanAmount"
            value={startNewPlanAmount}
            label="New Monthly Amount"
            onChange={handleInputChange}
            notEmpty={!!startNewPlanAmount.length} />
          <LoadingButtonPresenter
            color="#555"
            dimensions={12}
            isLoading={isLoading}
            onClick={startNewSubscription}
            classNameProp="supportPlanOptionsButton">
            <div className="displayFlex flexAllCenter">
              <Io.IoIosHeart className="iconMarginBoth font16 pinkText" />
              <p className="font16">DONATE</p>
            </div>
          </LoadingButtonPresenter>
        </div>
      </div>
    </div>
  </div>
)

export default NewPlanButtonPresenter
