/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { fetchUserInfo } from './userInfo'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {userInfo: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchUserInfo', () => {
    it('eventually dispatches the SET_USER_INFO action', () => {
      const fakeUserInfo = {
        userName: {first: 'Cody', last: 'Just Cody'},
        investmentTotal: 100,
      }
      mockAxios.onGet('/api/users/').replyOnce(200, fakeUserInfo)
      return store.dispatch(fetchUserInfo())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('SET_USER_INFO')
          expect(actions[0].userInfo).to.be.deep.equal(fakeUserInfo)
        })
    })
  })
})
