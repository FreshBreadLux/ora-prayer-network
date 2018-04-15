import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { HomePresenter, AboutPresenter, GetInvolvedPresenter, SupportContainer, DonorSignupPresenter, ThankYouPresenter, PrivacyPolicyPresenter, CheckLoggedInContainer, ProjectProposalContainer } from './components'

const Routes = () => (
  <Switch>
    <Route path="/home" component={HomePresenter} />
    <Route path="/about" component={AboutPresenter} />
    <Route path="/support" component={SupportContainer} />
    <Route path="/get-involved" component={GetInvolvedPresenter} />
    <Route path="/donor-signup" render={props => <DonorSignupPresenter {...props} />} />
    <Route path="/manage-my-donations" component={CheckLoggedInContainer} />
    <Route path="/project-proposal" render={ProjectProposalContainer} />
    <Route path="/thank-you" component={ThankYouPresenter} />
    <Route path="/privacy-policy" component={PrivacyPolicyPresenter} />
    <Route component={HomePresenter} />
  </Switch>
)


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Routes))
