import React from 'react'
import { connect } from 'react-redux'
import { fetchChargeHistory } from '../store'

const HistoryPresenter = ({ chargeHistory, userId, jwToken, dispatchFetchChargeHistory, showMoreCharges, toggleShowMoreCharges }) => (
  <div>
    <p className="raleway font20 bottomMarginHalfem topMargin1em">HISTORY</p>
    {chargeHistory.map((charge, index) => {
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
        className="historyShowButton"
        onClick={() => {
          dispatchFetchChargeHistory(userId, jwToken, 100)
          .then(toggleShowMoreCharges)
        }}>SHOW MORE</button>
    : <button
        className="historyShowButton"
        onClick={toggleShowMoreCharges}>SHOW FEWER</button>
    }
  </div>
)

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
  chargeHistory: state.chargeHistory,
})

const mapDispatch = dispatch => ({
  dispatchFetchChargeHistory: (userId, jwToken, limit) => dispatch(fetchChargeHistory(userId, jwToken, limit)),
})

export default connect(mapState, mapDispatch)(HistoryPresenter)
