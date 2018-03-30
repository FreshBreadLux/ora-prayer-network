import React from 'react'

const HistoryPresenter = ({ charges }) => (
  <div>
    <p className="raleway font24 bottomMarginHalfem topMargin1em">HISTORY</p>
    {charges.map(charge => (
      <div
        key={charge.id}
        className="supportPlanDiv bottomMarginHalfem">
        <p>{`Donation amount: $${charge.amount / 100}`}</p>
        <p>{`Date: ${new Date(charge.created * 1000).toDateString().slice(3)
          .toUpperCase()}`}</p>
      </div>
    ))}
  </div>
)

export default HistoryPresenter
