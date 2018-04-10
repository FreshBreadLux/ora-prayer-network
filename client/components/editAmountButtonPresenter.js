import React from 'react'
import LoadingButtonPresenter from './loadingButtonPresenter'
import FormInputPresenter from './formInputPresenter'
const Io = require('react-icons/lib/io')

const EditAmountButtonPresenter = ({ toggleStateField, customInputRevealed, updatePlanAmount, handleInputChange, isLoading, updateSubscription }) => (
  <div>
    <button
      className="supportPlanOptionsButton width170Pixels flexJustifyBetween"
      onClick={() => toggleStateField('customInputRevealed')}>
      EDIT MONTHLY AMOUNT
      <Io.IoChevronRight className={customInputRevealed
      ? 'menuChevronDown'
      : 'menuChevronRight'} />
    </button>
    <div className={customInputRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
      <div className="displayFlex flexColumn bottomMargin1em">
        <p className="font12 bottomMargin1em">The updated amount will take effect on your next donation date</p>
        <div className="displayFlex flexJustifyBetween flexAlignCenter">
          <FormInputPresenter
            type="text"
            inputMode="text"
            name="updatePlanAmount"
            value={updatePlanAmount}
            label="New Monthly Amount"
            onChange={handleInputChange}
            notEmpty={!!updatePlanAmount.length} />
          <LoadingButtonPresenter
            color="#555"
            dimensions={12}
            isLoading={isLoading}
            onClick={updateSubscription}
            classNameProp="supportPlanOptionsButton">
            <div className="displayFlex flexAllCenter">
              <Io.IoIosHeart className="iconMarginBoth font16 pinkText" />
              <p className="font16">UPDATE</p>
            </div>
          </LoadingButtonPresenter>
        </div>
      </div>
    </div>
  </div>
)

export default EditAmountButtonPresenter
