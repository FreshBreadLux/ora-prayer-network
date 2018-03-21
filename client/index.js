import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StripeProvider apiKey="pk_test_fForoFsHAEaZ91B9z270zs66">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
