import React from 'react'

const HistoryPresenter = ({ charges, userId, jwToken, fetchChargeHistory, showMoreCharges, toggleShowMoreCharges }) => (
  <div>
    <p className="raleway font20 bottomMarginHalfem topMargin1em">HISTORY</p>
    {charges.map((charge, index) => {
      if (showMoreCharges) {
        return (
          <div
            key={charge.id}
            className="supportPlanDiv bottomMarginHalfem">
            <p>{`Donation amount: $${charge.amount / 100}`}</p>
            <p>{`Date: ${new Date(charge.created * 1000).toDateString().slice(3)
              .toUpperCase()}`}</p>
          </div>
        )
      } else if (!showMoreCharges && index < 10) {
        return (
          <div
            key={charge.id}
            className="supportPlanDiv bottomMarginHalfem">
            <p>{`Donation amount: $${charge.amount / 100}`}</p>
            <p>{`Date: ${new Date(charge.created * 1000).toDateString().slice(3)
              .toUpperCase()}`}</p>
          </div>
        )
      }
    })}
    {!showMoreCharges
    ? <button
        className="topMargin1em bottomMargin3em whiteText raleway"
        onClick={() => {
          fetchChargeHistory(userId, jwToken, 100)
          .then(toggleShowMoreCharges)
        }}>SHOW MORE</button>
    : <button
        className="topMargin1em bottomMargin3em whiteText raleway"
        onClick={toggleShowMoreCharges}>SHOW FEWER</button>
    }
  </div>
)

export default HistoryPresenter
