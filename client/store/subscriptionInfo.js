import axios from 'axios'
import LOGOUT from './auth'
import { ROOT_URL } from '../config'


/**
 * ACTION TYPES
 */
const SET_SUBSCRIPTION_INFO = 'SET_SUBSCRIPTION_INFO'
const CLEAR_SUBSCRIPTION_INFO = 'CLEAR_SUBSCRIPTION_INFO'

/**
 * INITIAL STATE
 */
const defaultSubscriptionInfo = {
  created: 'CANCELED',
  billing_cycle_anchor: '',
  plan: {amount: 0, interval: 'month'},
}

/**
 * ACTION CREATORS
 */
const setSubscriptionInfo = subscriptionInfo => ({type: SET_SUBSCRIPTION_INFO, subscriptionInfo})
const clearSubscriptionInfo = () => ({type: CLEAR_SUBSCRIPTION_INFO})

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
        return dispatch(setSubscriptionInfo(subscriptions.data.data[0]))
      } else {
        return dispatch(setSubscriptionInfo({
          created: 'CANCELED',
          billing_cycle_anchor: '',
          plan: {amount: 0, interval: 'month'},
        }))
      }
    })
    .catch(err => console.log(err))

export const updateSubscription = (userId, jwToken, subscriptionInfo, amount) =>
  dispatch =>
    axios.put(`${ROOT_URL}/api/donations/subscriptions/${subscriptionInfo.id}`, {
      amount: +amount * 100
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => dispatch(setSubscriptionInfo(subscription.data)))
    .catch(err => console.log(err))

export const updateBillingDate = (jwToken, subscriptionInfo, billingDate) =>
  dispatch =>
    axios.put(`${ROOT_URL}/api/donations/subscriptions/${subscriptionInfo.id}/billingAnchor`, {
      billingDate
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => dispatch(setSubscriptionInfo(subscription.data)))
    .catch(err => console.log(err))

export const deleteSubscription = (jwToken, subscriptionInfo) =>
  dispatch =>
    axios.delete(`${ROOT_URL}/api/donations/subscriptions/${subscriptionInfo.id}`, {
      headers: {token: jwToken}
    })
    .then(() => dispatch(clearSubscriptionInfo()))
    .catch(err => console.log(err))

export const createSubscription = (userId, jwToken, amount) =>
  dispatch =>
    axios.post(`${ROOT_URL}/api/donations/subscriptions`, {
      userId,
      amount: +amount * 100
    }, {
      headers: {token: jwToken}
    })
    .then(subscription => dispatch(setSubscriptionInfo(subscription.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultSubscriptionInfo, action) {
  switch (action.type) {
    case SET_SUBSCRIPTION_INFO:
      return action.subscriptionInfo
    case CLEAR_SUBSCRIPTION_INFO:
      return defaultSubscriptionInfo
    case LOGOUT:
      return defaultSubscriptionInfo
    default:
      return state
  }
}
