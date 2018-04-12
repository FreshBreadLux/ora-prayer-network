/**
 * ACTION TYPES
 */
const SET_AUTH_INFO = 'SET_AUTH_INFO'
export const LOGOUT = 'LOGOUT'

/**
 * INITIAL STATE
 */
const defaultAuthInfo = {
  userId: null,
  jwToken: null,
  isLoggedIn: false,
}

/**
 * ACTION CREATORS
 */
export const setAuthInfo = authInfo => ({type: SET_AUTH_INFO, authInfo})
export const logout = () => ({type: LOGOUT})

/**
 * REDUCER
 */
export default function (state = defaultAuthInfo, action) {
  switch (action.type) {
    case SET_AUTH_INFO:
      return action.authInfo
    case LOGOUT:
      return defaultAuthInfo
    default:
      return state
  }
}
