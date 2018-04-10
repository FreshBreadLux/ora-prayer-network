import React from 'react'
import FormInputPresenter from './formInputPresenter'
const Io = require('react-icons/lib/io')

const LoginPagePresenter = ({ error, handleSubmit, checkEmail, handleInputChange, checkEmailReturned, stripeCustomerExists, email, password }) => (
  <div className="loginPageBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAllCenter padding1em">
      <p className="raleway font16">{error}</p>
      <form onSubmit={handleSubmit} className="loginForm">
        <FormInputPresenter
          type="email"
          name="email"
          label="Email"
          value={email}
          inputMode="email"
          onBlur={checkEmail}
          notEmpty={!!email.length}
          onChange={handleInputChange} />
        <FormInputPresenter
          type="password"
          name="password"
          label="Password"
          inputMode="text"
          value={password}
          notEmpty={!!password.length}
          onChange={handleInputChange} />
        <div className={checkEmailReturned && !stripeCustomerExists ? 'redirectMessage' : 'redirectMessageHidden'}>
          <p className="raleway blackText centerText font12">There isn't a donation profile associated with this email. Please head over to Donor Signup to create an account</p>
        </div>
        <div className="displayFlex flexAllCenter">
          <button className="loginFormButton" type="submit" disabled={!checkEmailReturned || !stripeCustomerExists}>
            <Io.IoLogIn className="iconMarginRight" />
            LOGIN
          </button>
        </div>
      </form>
    </div>
    <div className="displayFlex flex1" />
  </div>
)

export default LoginPagePresenter
