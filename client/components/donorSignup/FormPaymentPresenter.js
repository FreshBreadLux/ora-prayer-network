import React from 'react'
import { FormInputPresenter } from '../'

const FormPaymentPresenter = ({ firstName, lastName, email, password, address, city, state, handleInputChange, checkEmail, checkEmailReturned, userExists, stripeCustomerExists, setInputRef, handleKeyDown }) => (
  <div>
    <p className="stripeFormSectionHeader">PAYMENT INFORMATION</p>
    <div className="paymentInfoDiv">
      <div className="displayFlex">
        <div className="widthPercent50">
          <FormInputPresenter
            type="text"
            inputMode="text"
            name="firstName"
            value={firstName}
            inputRef={ref => setInputRef(ref, 'firstName')}
            label="First Name"
            onKeyDown={event => handleKeyDown(event, 'lastName')}
            onChange={handleInputChange}
            notEmpty={!!firstName.length} />
        </div>
        <div className="widthPercent50">
          <FormInputPresenter
            type="text"
            inputMode="text"
            name="lastName"
            value={lastName}
            inputRef={ref => setInputRef(ref, 'lastName')}
            label="Last Name"
            onKeyDown={event => handleKeyDown(event, 'email')}
            onChange={handleInputChange}
            notEmpty={!!lastName.length} />
        </div>
      </div>
      <FormInputPresenter
        type="email"
        inputMode="email"
        name="email"
        value={email}
        inputRef={ref => setInputRef(ref, 'email')}
        label="Email"
        onKeyDown={event => handleKeyDown(event, 'password')}
        onBlur={checkEmail}
        onChange={handleInputChange}
        notEmpty={!!email.length} />
      <div className={checkEmailReturned && userExists && stripeCustomerExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
        <p className="raleway greyText font12 bottomMargin1em">You already have a donation profile. Use My Donations to manage your support</p>
      </div>
      <div className={checkEmailReturned && !stripeCustomerExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
        <p className="raleway greenText font12 bottomMargin1em">
          {!userExists
          ? `Welcome! You'll need to set a password to use in the Ora app and to manage your donations`
          : `Welcome back! Please verify your account using the same password that you used for the Ora app`
          }
        </p>
        <FormInputPresenter
          type="password"
          inputMode="password"
          name="password"
          value={password}
          inputRef={ref => setInputRef(ref, 'password')}
          label="Password"
          onKeyDown={event => handleKeyDown(event, 'address')}
          onChange={handleInputChange}
          notEmpty={!!password.length} />
      </div>
      <FormInputPresenter
        type="text"
        inputMode="text"
        name="address"
        value={address}
        inputRef={ref => setInputRef(ref, 'address')}
        label="Address"
        onKeyDown={event => handleKeyDown(event, 'city')}
        onChange={handleInputChange}
        notEmpty={!!address.length} />
      <div className="displayFlex">
        <div className="widthPercent50">
          <FormInputPresenter
            type="text"
            inputMode="text"
            name="city"
            value={city}
            inputRef={ref => setInputRef(ref, 'city')}
            label="City"
            onKeyDown={event => handleKeyDown(event, 'state')}
            onChange={handleInputChange}
            notEmpty={!!city.length} />
        </div>
        <div className="widthPercent50">
          <FormInputPresenter
            type="text"
            inputMode="text"
            name="state"
            value={state}
            inputRef={ref => setInputRef(ref, 'state')}
            label="State"
            onChange={handleInputChange}
            notEmpty={!!state.length} />
        </div>
      </div>
    </div>
  </div>
)

export default FormPaymentPresenter
