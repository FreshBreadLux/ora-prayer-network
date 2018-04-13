import React from 'react'
import { NavbarContainer } from './components'
import { Elements } from 'react-stripe-elements'
import Routes from './routes'


const App = () => {
  return (
    <Elements>
      <div className="displayFlex flexColumn minHeightvh100">
        <NavbarContainer />
        <Routes />
      </div>
    </Elements>
  )
}

export default App
