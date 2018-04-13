import axios from 'axios'
import LOGOUT from './auth'
import { ROOT_URL } from '../config'


/**
 * ACTION TYPES
 */
const SET_USER_INFO = 'SET_USER_INFO'
const INCREMENT_INVESTMENT_TOTAL = 'INCREMENT_INVESTMENT_TOTAL'

/**
 * INITIAL STATE
 */
const defaultUserInfo = {
  userName: {first: 'Support', last: 'Team'},
  investmentTotal: 0,
}

/**
 * ACTION CREATORS
 */
const setUserInfo = userInfo => ({type: SET_USER_INFO, userInfo})
export const incrementInvestmentTotal = amount => ({type: INCREMENT_INVESTMENT_TOTAL, amount})

/**
 * THUNK CREATORS
 */
export const fetchUserInfo = userId =>
  dispatch =>
    axios.get(`${ROOT_URL}/api/users/${userId}`)
    .then(user =>
      dispatch(setUserInfo({
        userName: {first: user.data.firstName, last: user.data.lastName},
        investmentTotal: user.data.investmentTotal,
      })))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUserInfo, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo
    case INCREMENT_INVESTMENT_TOTAL:
      return {...state, investmentTotal: state.investmentTotal + action.amount}
    case LOGOUT:
      return defaultUserInfo
    default:
      return state
  }
}
