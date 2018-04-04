import React from 'react'

const FormPaymentSection = ({ handleInputChange, checkEmail, checkEmailReturned, userExists, setAddressFieldRef, setPasswordFieldRef, stripeCustomerExists }) => (
  <div>
    <p className="stripeFormSectionHeader">PAYMENT INFORMATION</p>
    <div className="paymentInfoDiv">
      <div className="lineItemDiv bottomMargin1em">
        <label className="raleway greyText font12">NAME</label>
        <div className="displayFlex flexJustifyCenter">
          <input
            type="text"
            name="firstName"
            inputMode="text"
            onChange={handleInputChange}
            className="donateInputLine widthPercent50"
            placeholder="First Name" />
          <input
            type="text"
            name="lastName"
            inputMode="text"
            onChange={handleInputChange}
            className="donateInputLine widthPercent50"
            placeholder="Last Name" />
        </div>
      </div>
      <div className="lineItemDiv bottomMargin1em">
        <label className="raleway greyText font12">EMAIL</label>
        <div className="displayFlex">
          <input
            type="email"
            name="email"
            inputMode="email"
            onChange={handleInputChange}
            onBlur={checkEmail}
            className="donateInputLine widthPercent100"
            placeholder="Email" />
        </div>
      </div>
      <div className={checkEmailReturned && userExists && stripeCustomerExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
        <p className="raleway greyText font10 bottomMargin1em">YOU ALREADY HAVE A DONATION PROFILE. PLEASE GO TO 'MANAGE MY DONATIONS'</p>
      </div>
      <div className={checkEmailReturned && !stripeCustomerExists ? 'revealedEmailMessageDiv' : 'hiddenEmailMessageDiv'}>
        <p className="raleway greenText font10 bottomMargin1em">
          {!userExists
          ? `WELCOME! YOU'LL NEED TO SET A PASSWORD TO USE IN THE ORA APP AND TO MANAGE YOUR DONATIONS`
          : `WELCOME BACK! PLEASE VERIFY YOUR ACCOUNT USING THE SAME PASSWORD YOU USED FOR THE ORA APP`
          }
        </p>
        <input
          ref={setPasswordFieldRef}
          type="password"
          name="password"
          inputMode="text"
          onChange={handleInputChange}
          className="donateInputLine widthPercent100 bottomMargin1em"
          placeholder="Password" />
      </div>
      <div className="lineItemDiv bottomMargin1em">
        <label className="raleway greyText font12">ADDRESS</label>
        <div className="displayFlex">
          <input
            ref={setAddressFieldRef}
            type="text"
            name="address"
            inputMode="text"
            onChange={handleInputChange}
            className="donateInputLine widthPercent100"
            placeholder="Address" />
        </div>
      </div>
      <div className="lineItemDiv">
        <label className="raleway greyText font12">CITY | STATE</label>
        <div className="displayFlex flexJustifyCenter">
          <input
            type="text"
            name="city"
            inputMode="text"
            onChange={handleInputChange}
            className="donateInputLine widthPercent50"
            placeholder="City" />
          <input
            type="text"
            name="state"
            inputMode="text"
            onChange={handleInputChange}
            className="donateInputLine widthPercent50"
            placeholder="State" />
        </div>
      </div>
    </div>
  </div>
)

export default FormPaymentSection
