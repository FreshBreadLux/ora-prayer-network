/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from './home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('home', () => {
  let home

  beforeEach(() => {
    home = shallow(<Home />)
  })

  it('renders *Home* as an h1', () => {
    expect(home.find('h1').text()).to.be.equal('Home')
  })
})
