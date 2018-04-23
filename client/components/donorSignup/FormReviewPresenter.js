import React from 'react'
import Loader from 'react-loader-spinner'
const Io = require('react-icons/lib/io')

class FormReviewPresenter extends React.Component {
  constructor(props) {
    super(props)
    this.buttonDisabled = this.buttonDisabled.bind(this)
    this.createReviewString = this.createReviewString.bind(this)
  }

  createReviewString() {
    if (this.props.singleDonation.length) {
      return (
        <div>
          <p className="raleway blackText font30 rightText">
            {`$${this.props.singleDonation} `}
          </p>
          <p className="raleway blackText font16 rightText">single donation</p>
        </div>
      )
    } else if (this.props.monthlyDonation.length) {
      return (
        <div>
          <p className="raleway blackText font30 rightText">
            {`$${this.props.monthlyDonation} `}
          </p>
          <p className="raleway blackText font16 rightText">monthly donation</p>
        </div>
      )
    } else {
      return ''
    }
  }

  buttonDisabled() {
    const { firstName, lastName, email, password, city, state, zip, singleDonation, monthlyDonation } = this.props
    if (firstName && lastName && email && password && city && state && zip && (singleDonation || monthlyDonation)) {
      return false
    } else {
      return true
    }
  }

  render() {
    const { email, monthlyDonation, isLoading } = this.props
    return (
      <div>
        <p className="stripeFormSectionHeader">REVIEW</p>
        <div className="reviewDiv">
          <p className="raleway blackText font12 bottomMargin1em">DONATION TO ORA PRAYER NETWORK INC.</p>
          <p className="raleway blackText font12 bottomMargin1em">
            {monthlyDonation.length
            ? 'ANGEL INVESTOR STATUS'
            : 'DONOR STATUS'}
          </p>
          <p className="raleway blackText font12 bottomMargin1em">{email}</p>
          {this.createReviewString()}
        </div>
        <div className="displayFlex flexJustifyCenter">
          <button
            type="submit"
            disabled={this.buttonDisabled()}
            className={this.buttonDisabled()
            ? 'stripeFormButtonDisabled'
            : 'stripeFormButton'}>
            {isLoading
            ? <Loader type="Bars" height={20} width={20} color="#000" />
            : <div className="displayFlex flexAllCenter">
                <Io.IoIosHeart className={this.buttonDisabled()
                ? 'iconMarginRight font20 greyText'
                : 'iconMarginRight font20 pinkText'} />
                DONATE
              </div>
            }
          </button>
        </div>
      </div>
    )
  }
}

export default FormReviewPresenter
