import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userInfo from './userInfo'
import auth from './auth'
import subscriptionInfo from './subscriptionInfo'
import chargeHistory from './chargeHistory'

const reducer = combineReducers({ userInfo, auth, subscriptionInfo, chargeHistory })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './userInfo'
export * from './auth'
export * from './subscriptionInfo'
export * from './chargeHistory'
