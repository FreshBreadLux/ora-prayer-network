import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { HomePresenter, AboutPresenter, GetInvolvedPresenter, Support, DonorSignup, ThankYou, PrivacyPolicy, CheckLoggedInContainer } from './components'

const Routes = () => (
  <Switch>
    <Route path="/home" component={HomePresenter} />
    <Route path="/about" component={AboutPresenter} />
    <Route path="/get-involved" component={GetInvolvedPresenter} />
    <Route path="/support" component={Support} />
    <Route path="/donor-signup" render={props => <DonorSignup {...props} />} />
    <Route path="/thank-you" component={ThankYou} />
    <Route path="/manage-my-donations" component={CheckLoggedInContainer} />
    <Route path="/privacy-policy" component={PrivacyPolicy} />
    <Route component={HomePresenter} />
  </Switch>
)


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Routes))
