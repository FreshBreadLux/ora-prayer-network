import React from 'react'

const ManageMyDonationsPresenter = ({ plan, created, logout, toggleCustomInput, customInputRevealed, handleInputChange, updateSubscription }) => (
  <div className="displayFlex flexColumn flex1 padding1em">
    <p className="raleway font24 bottomMarginHalfem">ANGEL INVESTOR</p>
    <div className="supportPlanDiv">
      <p className="bottomMarginHalfem">SUPPORT PLAN</p>
      <p className="font12 bottomMargin3em">
        {`STARTED: ${new Date(created * 1000)
        .toDateString()
        .slice(3)
        .toUpperCase()}`}</p>
      <div className="displayFlex flexJustifyBetween">
        <div className="displayFlex flexColumn flexAlignStart">
          <button
            onClick={toggleCustomInput}
            className="supportPlanButton">
            EDIT MONTHLY AMOUNT
          </button>
          <div className={customInputRevealed ? 'revealedCustomInputDiv' : 'hiddenCustomInputDiv'}>
            <div className="displayFlex flexColumn">
              <input
                name="updatePlanAmount"
                className="donateInputLine"
                onChange={handleInputChange} />
              <button
                onClick={updateSubscription}
                className="confirmSupportPlanButton">UPDATE</button>
            </div>
          </div>
          <button className="supportPlanButton">CANCEL SUPPORT PLAN</button>
        </div>
        <p className="font18 alignSelfEnd">{`$${plan.amount / 100} / ${plan.interval}`}</p>
      </div>
    </div>
    <button onClick={logout}>LOGOUT</button>
  </div>
)

export default ManageMyDonationsPresenter
