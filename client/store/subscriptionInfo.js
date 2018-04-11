import axios from 'axios'
import LOGOUT from './auth'

const ROOT_URL = 'https://ora-pro-nobis.herokuapp.com'

/**
 * ACTION TYPES
 */
const SET_SUBSCRIPTION_INFO = 'SET_SUBSCRIPTION_INFO'

/**
 * INITIAL STATE
 */
const defaultSubscriptionInfo = {
  plan: {amount: 0, interval: 'month'}
}

/**
 * ACTION CREATORS
 */
const setSubscriptionInfo = subscriptionInfo => ({type: SET_SUBSCRIPTION_INFO, subscriptionInfo})

/**
 * THUNK CREATORS
 */
export const fetchSubscriptionInfo = (userId, jwToken) =>
  dispatch =>
    axios.get(`${ROOT_URL}/api/donations/subscriptions?userId=${userId}`, {
      headers: {token: jwToken}
    })
    .then(subscriptions => {
      if (subscriptions.data.data[0]) {
        dispatch(setSubscriptionInfo(subscriptions.data.data[0]))
      } else {
        dispatch(setSubscriptionInfo({
          plan: {amount: 0, interval: 'month'},
          created: 'CANCELED',
        }))
      }
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSubscriptionInfo, action) {
  switch (action.type) {
    case SET_SUBSCRIPTION_INFO:
      return action.subscriptionInfo
    case LOGOUT:
      return defaultSubscriptionInfo
    default:
      return state
  }
}
