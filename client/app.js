import React from 'react'
import { NavbarPresenter } from './components'
import { Elements } from 'react-stripe-elements'
import Routes from './routes'


const App = () => {
  return (
    <Elements>
      <div className="displayFlex flexColumn minHeightvh100">
        <NavbarPresenter />
        <Routes />
      </div>
    </Elements>
  )
}

export default App
