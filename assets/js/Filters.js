import React from 'react'
import onClickOutside from 'react-onclickoutside'

import { CuisinePlaceholder } from './placeholders'

const { string, bool, object, func, number, array } = React.PropTypes

const Filters = onClickOutside(React.createClass({
  propTypes: {
    toggleMobile: func,
    mobileMenu: bool,
    searchResults: object,
    foodFacet: func,
    addPayment: func,
    removePayment: func,
    addRating: func,
    removeRating: func,
    blurMenu: func,
  },
  getInitialState() {
    return {
      currentRatingFilter:'',
      currentFoodType:'',
      payments: {
        AMEX: false,
        Discover: false,
        MasterCard: false,
        Visa: false
      }
    }
  },
  handleFoodTypeClick(facetValue){
    if(this.state.currentFoodType === ''){
      this.setState({ currentFoodType: facetValue })
    } else {
      this.setState({ currentFoodType: '' })
    }
    this.props.foodFacet('food_type', facetValue)

  },
  renderFoodTypes(){
    if(!Object.keys(this.props.searchResults).length) { return }
    const foodTypes = this.props.searchResults.getFacetValues('food_type')
    return foodTypes.map((type, i) => {
      return (
        <li key={i} onClick={this.handleFoodTypeClick.bind(null, type.name)} className={this.state.currentFoodType === type.name ? 'active' : ''} >
          <span className="food-type">{type.name}</span>
          <span className="food-type-amount">{type.count}</span>
        </li>
      )
    }, this)

  },
  addPaymentDisjunctive(value) {
    const paymentState = Object.assign(this.state.payments, { [value]: true })
    this.setState({ payments: paymentState })
    this.props.addPayment('payment_options', value)
  },
  removePaymentDisjunctive(value) {
    const paymentState = Object.assign(this.state.payments, { [value]: false })
    this.setState({ payments: paymentState })
    this.props.removePayment('payment_options', value)
  },
  handlePaymentToggle(value){
    this.state.payments[value] ? this.removePaymentDisjunctive(value) : this.addPaymentDisjunctive(value)
  },
  addRatingFilter(value){
    this.props.addRating(value)
  },
  removeRatingFilter(value){
    this.props.removeRating(value)
  },
  combineAddAndRemove(add, remove){
    this.props.combineAddAndRemove(add, remove)
  },
  handleRatingFilter(value){
    if(this.state.currentRatingFilter === '') {
      this.addRatingFilter(value)
      this.setState({ currentRatingFilter:value })
    } else {
        if(this.state.currentRatingFilter === value) {
        this.removeRatingFilter(value)
        this.setState({ currentRatingFilter: '' })
       } else {
        this.combineAddAndRemove(value, this.state.currentRatingFilter)
        // this.removeRatingFilter(this.state.currentRatingFilter)
        // this.addRatingFilter(value)
        this.setState({ currentRatingFilter: value })
       }
    }

  },
  closeMenu(){
    this.props.toggleMobile()
  },
  handleClickOutside(){
    this.props.blurMenu()
  },
  render() {
    const foodTypes = (
      <ul className="cuisine">
        {this.renderFoodTypes()}
      </ul>
    )
    return (
      <div style={this.props.mobileMenu ? {transform:'translateX(0)'} : {} } className="filters" >
        <div className="mobile-header">
         <div className="mobile-menu-title">Sort by:</div>
         <div onClick={this.closeMenu} className="mobile-menu-close">x</div>
        </div>
        <h4>Cuisine/Food Type</h4>
          {!Object.keys(this.props.searchResults).length /*|| !this.props.searchResults.facets.length*/ ? CuisinePlaceholder() : foodTypes}
        <h4>Rating</h4>
        <ul className="ratings">
          <li onClick={this.handleRatingFilter.bind(null, 0)} className={this.state.currentRatingFilter === 0 ? 'active stars no-star' : 'stars no-star'}></li>
          <li onClick={this.handleRatingFilter.bind(null, 1)} className={this.state.currentRatingFilter === 1 ? 'active stars one-star' : 'stars one-star' }></li>
          <li onClick={this.handleRatingFilter.bind(null, 2)} className={this.state.currentRatingFilter === 2 ? 'active stars two-star' : 'stars two-star' }></li>
          <li onClick={this.handleRatingFilter.bind(null, 3)} className={this.state.currentRatingFilter === 3 ? 'active stars three-star' : 'stars three-star' }></li>
          <li onClick={this.handleRatingFilter.bind(null, 4)} className={this.state.currentRatingFilter === 4 ? 'active stars four-star' : 'stars four-star'}></li>
          <li onClick={this.handleRatingFilter.bind(null, 5)} className={this.state.currentRatingFilter === 5 ? 'active stars five-star' : 'stars five-star'}></li>
        </ul>
        <h4>Payment Options</h4>
        <ul className="payment-options">
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'AMEX')} type="checkbox"/>
            <span className="card cc-ae"></span>&nbsp;
            {this.props.mobileMenu ? 'AMEX' : 'American Express'}
          </li>
          <li className="payment-type">
           <input onClick={this.handlePaymentToggle.bind(null, 'Discover')} type="checkbox"/>
           <span className="card cc-discover"></span>&nbsp;
           Discover
            {/*<ul className="nested-payment">
                          <li className="payment-type">
                            <input type="checkbox"/>
                            Diners Club
                          </li>
                          <li className="payment-type">
                            <input type="checkbox"/>
                            Carte Blanche
                          </li>
                        </ul>*/}
          </li>
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'MasterCard')} type="checkbox"/>
            <span className="card cc-mc"></span>&nbsp;
            MasterCard
          </li>
          <li className="payment-type">
            <input onClick={this.handlePaymentToggle.bind(null, 'Visa')} type="checkbox"/>
            <span className="card cc-visa"></span>&nbsp;
            Visa
          </li>
        </ul>
      </div>
    )
  }
}))


export default Filters
