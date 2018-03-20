import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, About, GetInvolved, Blog, Feedback, Support, Donate, PrivacyPolicy } from './components'

const Routes = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/get-involved" component={GetInvolved} />
    <Route path="/blog" component={Blog} />
    <Route path="/feedback" component={Feedback} />
    <Route path="/support" component={Support} />
    <Route path="/donate" component={Donate} />
    <Route path="/privacy-policy" component={PrivacyPolicy} />
    <Route component={Home} />
  </Switch>
)


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Routes))
