import React from 'react'
import Loader from 'react-loader-spinner'
import { FooterPresenter } from '../'

const ProjectProposalPresenter = ({ confirmation, error, handleSubmit, handleInputChange, name, email, subject, body, isLoading }) => (
  <div className="helpBackgroundImage">
    <div className="displayFlex flexColumn flex1 flexAllCenter">
      <div className="padding1em displayFlex flexColumn flexAllCenter">
        <p className="raleway font24 centerText">We're excited to hear from you!</p>
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
      <form className="projectProposalForm" onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="text"
          name="name"
          value={name}
          placeholder="Name"
          className="projectProposalInput"
          onChange={handleInputChange} />
        <input
          type="email"
          inputMode="email"
          name="email"
          value={email}
          placeholder="Email"
          className="projectProposalInput"
          onChange={handleInputChange}
          required />
        <input
          type="text"
          inputMode="text"
          name="subject"
          value={subject}
          placeholder="Project or Feature Idea"
          className="projectProposalInput"
          onChange={handleInputChange} />
        <textarea
          type="text"
          inputMode="text"
          name="body"
          value={body}
          placeholder="Please describe your idea here in as much detail as possible. We'll review your proposal and get back to you as soon as possible."
          className="vh25 projectProposalInput"
          onChange={handleInputChange} />
        <button className="projectProposalButton" type="submit">
          {isLoading
          ? <Loader type="Bars" height={16} width={16} color="#0c2461" />
          : 'SUBMIT'
          }
        </button>
      </form>
    </div>
    <FooterPresenter />
  </div>
)

export default ProjectProposalPresenter
