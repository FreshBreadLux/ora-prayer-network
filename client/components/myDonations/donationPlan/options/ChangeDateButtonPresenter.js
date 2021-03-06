import React from 'react'
import { FormInputPresenter, LoadingButtonPresenter } from '../../../'
const Io = require('react-icons/lib/io')

const ChangeDateButtonPresenter = ({ toggleStateField, changeBillingRevealed, handleInputChange, donationDate, isLoading, changeBillingDate }) => (
  <div>
    <button
      className="supportPlanOptionsButton width170Pixels flexJustifyBetween"
      onClick={() => toggleStateField('changeBillingRevealed')}>
      CHANGE DONATION DATE
      <Io.IoChevronRight className={changeBillingRevealed
      ? 'menuChevronDown'
      : 'menuChevronRight'} />
    </button>
    <div className={changeBillingRevealed ? 'revealedSupportPlanDiv' : 'hiddenSupportPlanDiv'}>
      <div className="displayFlex flexColumn bottomMargin1em">
        <p className="font12 bottomMargin1em">Which day of the month would you like to donate on?</p>
        <div className="displayFlex flexJustifyBetween flexAlignCenter">
          <FormInputPresenter
            step="1"
            type="number"
            inputMode="number"
            name="donationDate"
            value={donationDate}
            label="New Donation Date"
            onChange={handleInputChange}
            notEmpty={!!donationDate.length} />
          <LoadingButtonPresenter
            color="#555"
            dimensions={12}
            isLoading={isLoading}
            onClick={changeBillingDate}
            classNameProp="supportPlanOptionsButton">
            <div className="displayFlex flexAllCenter">
              <Io.IoIosCheckmarkOutline className="iconMarginBoth font16 blueText" />
              <p className="font16">CONFIRM</p>
            </div>
          </LoadingButtonPresenter>
        </div>
      </div>
    </div>
  </div>
)

export default ChangeDateButtonPresenter
