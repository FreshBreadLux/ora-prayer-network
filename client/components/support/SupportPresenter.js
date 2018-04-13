import React from 'react'
import Loader from 'react-loader-spinner'
import { FooterPresenter } from '../'

const SupportPresenter = ({ confirmation, error, handleSubmit, handleInputChange, name, email, subject, body, isLoading }) => (
  <div className="helpBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAllCenter">
      <div className="padding1em displayFlex flexColumn flexAllCenter">
        <p className="raleway font24 centerText">Have questions?</p>
        <p className="raleway font24 centerText">Need to tell us about a bug?</p>
        <p className="raleway font24 centerText">Want to share your story?</p>
      </div>
      {confirmation
      ? <p className="raleway font20 padding1em centerText">{confirmation}</p>
      : <div>
          {error
          ? <p className="raleway font20 padding1em centerText">{error}</p>
          : null
          }
        </div>
      }
      <form className="supportForm" onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="text"
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
          inputMode="text"
          name="body"
          value={body}
          placeholder="Body"
          className="vh25 supportFormInput"
          onChange={handleInputChange} />
        <button className="supportFormButton" type="submit">
          {isLoading
          ? <Loader type="Bars" height={16} width={16} color="#0c2461" />
          : 'HIT US UP'
          }
        </button>
      </form>
    </div>
    <FooterPresenter />
  </div>
)

export default SupportPresenter
