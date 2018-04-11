import axios from 'axios'
import LOGOUT from './auth'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

/**
 * ACTION TYPES
 */
const SET_CHARGE_HISTORY = 'SET_CHARGE_HISTORY'

/**
 * INITIAL STATE
 */
const defaultChargeHistory = []

/**
 * ACTION CREATORS
 */
const setChargeHistory = chargeHistory => ({type: SET_CHARGE_HISTORY, chargeHistory})

/**
 * THUNK CREATORS
 */
export const fetchChargeHistory = (userId, jwToken, limit = 10) =>
  dispatch =>
    axios.get(`${ROOT_URL}/api/donations/charges?userId=${userId}&limit=${limit}`, {
      headers: {token: jwToken}
    })
    .then(charges => dispatch(setChargeHistory(charges.data.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultChargeHistory, action) {
  switch (action.type) {
    case SET_CHARGE_HISTORY:
      return action.chargeHistory
    case LOGOUT:
      return defaultChargeHistory
    default:
      return state
  }
}
