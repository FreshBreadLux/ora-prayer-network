import React from 'react'
import { Link } from 'react-router-dom'
import FormInputPresenter from './formInputPresenter'

const LoginPagePresenter = ({ error, handleSubmit, checkEmail, handleInputChange, checkEmailReturned, stripeCustomerExists, email, password }) => (
  <div className="homeBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAlignCenter flexJustifyCenter">
      <p className="raleway font16">{error}</p>
      <form onSubmit={handleSubmit} className="loginForm">
        <FormInputPresenter
          type="email"
          name="email"
          label="EMAIL"
          inputMode="email"
          onBlur={checkEmail}
          notEmpty={!!email.length}
          onChange={handleInputChange} />
        <div className="lineItemDiv bottomMargin1em">
          <label className="inputLabel">PASSWORD</label>
          <div className="inputWrapperDiv">
            <input
              type="password"
              name="password"
              inputMode="text"
              placeholder="Password"
              className="loginFormInput"
              onChange={handleInputChange} />
          </div>
        </div>
        <div className={checkEmailReturned && !stripeCustomerExists ? 'redirectMessage' : 'redirectMessageHidden'}>
          <p>There isn't a donation profile associated with this email. Please head over to Donor Signup to create an account</p>
          <Link to="/donor-signup">DONOR SIGNUP</Link>
        </div>
        <div className="displayFlex flexJustifyCenter">
          <button className="supportPlanButton" type="submit" disabled={!checkEmailReturned || !stripeCustomerExists}>LOGIN</button>
        </div>
      </form>
    </div>
    <div className="displayFlex flex1" />
  </div>
)

export default LoginPagePresenter
