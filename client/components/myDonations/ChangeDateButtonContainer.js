import React from 'react'
import { connect } from 'react-redux'
import { updateBillingDate } from '../../store'
import { ChangeDateButtonPresenter } from '../'

function calculateBillingDate(day) {
  const now = new Date()
  let billingDate = new Date(now.getFullYear(), now.getMonth(), +day)
  if (now - billingDate > 0) billingDate.setMonth(now.getMonth() + 1)
  return billingDate.getTime() / 1000
}

class ChangeDateButtonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      donationDate: '',
      changeBillingRevealed: false,
    }
    this.toggleStateField = this.toggleStateField.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeBillingDate = this.changeBillingDate.bind(this)
  }

  toggleStateField(field) {
    this.setState({ [field]: !this.state[field] })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  changeBillingDate() {
    this.setState({ isLoading: true })
    const { subscriptionInfo, jwToken, dispatchUpdateBillingDate } = this.props
    const billingDate = calculateBillingDate(this.state.donationDate)
    dispatchUpdateBillingDate(jwToken, subscriptionInfo, billingDate)
    .then(() => this.setState({
      isLoading: false,
      donationDate: '',
      changeBillingRevealed: false,
    }))
    .catch(console.error)
  }

  render() {
    return (
      <ChangeDateButtonPresenter
        isLoading={this.state.isLoading}
        donationDate={this.state.donationDate}
        toggleStateField={this.toggleStateField}
        changeBillingDate={this.changeBillingDate}
        handleInputChange={this.handleInputChange}
        changeBillingRevealed={this.state.changeBillingRevealed} />
    )
  }
}

const mapState = state => ({
  jwToken: state.auth.jwToken,
  subscriptionInfo: state.subscriptionInfo,
})

const mapDispatch = dispatch => ({
  dispatchUpdateBillingDate: (jwToken, subscriptionInfo, date) => dispatch(updateBillingDate(jwToken, subscriptionInfo, date)),
})

export default connect(mapState, mapDispatch)(ChangeDateButtonContainer)
