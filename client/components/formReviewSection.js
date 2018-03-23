import React from 'react'

class FormReviewSection extends React.Component {
  constructor(props) {
    super(props)
    this.createReviewString = this.createReviewString.bind(this)
  }

  createReviewString() {
    if (this.props.selectedOption === 'OneTime') {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.props.oneTimeAmount} `}
          </p>
          <p className="raleway blackText font16 rightText">
            one-time donation
          </p>
        </div>
      )
    } else if (this.props.selectedOption === 'Other') {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.props.otherAmount} `}
          </p>
          <p className="raleway blackText font16 rightText">
            monthly donation
          </p>
        </div>
      )
    } else if (this.props.selectedOption === '') {
      return ''
    } else {
      return (
        <div>
          <p className="raleway blackText font20 rightText">
            {`$${this.props.selectedOption} `}
          </p>
          <p className="raleway blackText font16 rightText">
            monthly donation
          </p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <p className="stripeFormSectionHeader">REVIEW</p>
        <div className="reviewDiv blueBottomBorder bottomMargin1em">
          <p className="raleway blackText font12 bottomMargin1em">ANGEL INVESTOR STATUS</p>
          {this.createReviewString()}
        </div>
        <div className="displayFlex flexJustifyCenter">
          <button className="supportFormButton" type="submit">DONATE</button>
        </div>
      </div>
    )
  }
}

export default FormReviewSection
