import React from 'react'
import { connect } from 'react-redux'
import { createSubscription, incrementInvestmentTotal, fetchChargeHistory } from '../../store'
import { NewPlanButtonPresenter } from '../'

class NewPlanButtonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      startNewPlanAmount: '',
      startNewPlanRevealed: false,
    }
    this.toggleStateField = this.toggleStateField.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.startNewSubscription = this.startNewSubscription.bind(this)
  }

  toggleStateField(field) {
    this.setState({ [field]: !this.state[field] })
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  startNewSubscription() {
    this.setState({ isLoading: true })
    const { userId, jwToken, dispatchCreateSubscription } = this.props
    const { startNewPlanAmount } = this.state
    dispatchCreateSubscription(userId, jwToken, startNewPlanAmount)
    .then(() => {
      this.props.dispatchIncrementInvestmentTotal(startNewPlanAmount * 100)
      this.props.dispatchFetchChargeHistory(userId, jwToken)
    })
    .catch(console.error)
  }


  render() {
    return (
      <NewPlanButtonPresenter
        isLoading={this.state.isLoading}
        toggleStateField={this.toggleStateField}
        handleInputChange={this.handleInputChange}
        startNewSubscription={this.startNewSubscription}
        startNewPlanAmount={this.state.startNewPlanAmount}
        startNewPlanRevealed={this.state.startNewPlanRevealed} />
    )
  }
}

const mapState = state => ({
  userId: state.auth.userId,
  jwToken: state.auth.jwToken,
})

const mapDispatch = dispatch => ({
  dispatchCreateSubscription: (userId, jwToken, amount) => dispatch(createSubscription(userId, jwToken, amount)),
  dispatchIncrementInvestmentTotal: amount => dispatch(incrementInvestmentTotal(amount)),
  dispatchFetchChargeHistory: (userId, jwToken) => dispatch(fetchChargeHistory(userId, jwToken)),
})

export default connect(mapState, mapDispatch)(NewPlanButtonContainer)
