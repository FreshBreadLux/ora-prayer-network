import React from 'react'

const FormSupportSection = ({ handleInputChange, toggleOneTimeDonationDivOpen, selectedOption, oneTimeDonationDivOpen }) => (
  <div>
    <p className="stripeFormSectionHeader">SUPPORT INFORMATION</p>
    <div className="selectAmountDiv">
      <div className="radioButtonDiv">
        <input
          type="radio"
          id="25"
          name="selectedOption"
          value="25"
          onChange={handleInputChange}
          checked={selectedOption === '25'} />
        <label htmlFor="25">
          <span />$25 per month</label>
      </div>
      <div className="radioButtonDiv">
        <input
          type="radio"
          id="100"
          name="selectedOption"
          value="100"
          onChange={handleInputChange}
          checked={selectedOption === '100'} />
        <label htmlFor="100">
          <span />$100 per month</label>
      </div>
      <div className="radioButtonDiv">
        <input
          type="radio"
          id="200"
          name="selectedOption"
          value="200"
          onChange={handleInputChange}
          checked={selectedOption === '200'} />
        <label htmlFor="200">
          <span />$200 per month</label>
      </div>
      <div className="radioButtonDiv">
        <input
          type="radio"
          id="Custom"
          name="selectedOption"
          value="Custom"
          onChange={handleInputChange}
          checked={selectedOption === 'Custom'} />
        <label htmlFor="Custom">
          <span />Custom monthly amount</label>
      </div>
      <div className={selectedOption === 'Custom'
        ? 'revealedCustomAmountDiv' : 'hiddenCustomAmountDiv'}>
        <input
          type="text"
          name="customAmount"
          inputMode="text"
          onChange={handleInputChange}
          className="donateInputLine widthPercent100"
          placeholder="Custom Amount" />
      </div>
      <a href="#" onClick={toggleOneTimeDonationDivOpen} className="whatAboutOneTime">What about one-time donations?</a>
      <div className={oneTimeDonationDivOpen ? 'showOneTimeDonationDiv' : 'hideOneTimeDonationDiv'}>
        <p className="oneTimeDonationBlurb">We prefer recurring donations because we want to build relationships with our Angel Investors. However, if you'd like to make a one-time donation you can use the option below.</p>
        <div className="radioButtonDiv">
          <input
            type="radio"
            id="OneTime"
            name="selectedOption"
            value="OneTime"
            onChange={handleInputChange}
            checked={selectedOption === 'OneTime'} />
          <label id="OneTimeLabel" htmlFor="OneTime">
            <span />One-time donation</label>
        </div>
        <div className={selectedOption === 'OneTime'
          ? 'revealedOneTimeCustomAmountDiv' : 'hiddenOneTimeCustomAmountDiv'}>
          <input
            name="oneTimeAmount"
            type="text"
            inputMode="text"
            onChange={handleInputChange}
            className="oneTimeAmount widthPercent100"
            placeholder="One-Time Amount" />
        </div>
      </div>
    </div>
  </div>
)

export default FormSupportSection
