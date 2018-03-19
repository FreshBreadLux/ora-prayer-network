import React from 'react'
import { Navbar } from './components'
import Routes from './routes'


const App = () => {
  return (
    <div className="displayFlex flexColumn minHeightvh100">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
