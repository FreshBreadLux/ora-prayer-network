import React from 'react'
import Footer from './footer'

const SupportPresenter = ({ confirmation, error, handleSubmit, handleInputChange, name, email, subject, body }) => (
  <div className="helpBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAllCenter">
      <div className="padding1em displayFlex flexColumn flexAllCenter">
        <p className="raleway font24 centerText">Have questions?</p>
        <p className="raleway font24 centerText">Need to tell us about a bug?</p>
        <p className="raleway font24 centerText">Want to share your story?</p>
      </div>
      {confirmation
      ? <div className="messageFade">
          <p className="raleway font20 padding1em centerText">{confirmation}</p>
        </div>
      : <div>
          {error
          ? <div className="messageFade">
              <p className="raleway font20 padding1em centerText">{error}</p>
            </div>
          : null
          }
        </div>
      }
      <form className="supportForm" onSubmit={handleSubmit}>
        <input
          type="text"
          inputType="text"
          name="name"
          value={name}
          placeholder="Name"
          className="supportFormInput"
          onChange={handleInputChange} />
        <input
          type="email"
          inputMode="email"
          name="email"
          value={email}
          placeholder="Email"
          className="supportFormInput"
          onChange={handleInputChange}
          required />
        <input
          type="text"
          inputMode="text"
          name="subject"
          value={subject}
          placeholder="Subject"
          className="supportFormInput"
          onChange={handleInputChange} />
        <textarea
          type="text"
          inputType="text"
          name="body"
          value={body}
          placeholder="Body"
          className="vh25 supportFormInput"
          onChange={handleInputChange} />
        <input
          className="supportFormButton"
          type="submit"
          value="HIT US UP" />
      </form>
    </div>
    <Footer />
  </div>
)

export default SupportPresenter
