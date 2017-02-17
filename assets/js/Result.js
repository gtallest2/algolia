import React from 'react'
import haversine from 'haversine'

const Result = React.createClass({
  renderName() {
    return (
      <span>
        this.props._highlightResult.name.value
      </span>
    )
  },
  renderStarsClass() {
    const stars = parseFloat(this.props.stars_count)
    if(stars === 5) {
      return (
        <span className="stars five-star">
        </span>
      )
    }
    if(stars >= 4.5) {
      return (
        <span className="stars four-half-star">
        </span>
      )
    }
    if(stars >= 4) {
      return (
        <span className="stars four-star">
        </span>
      )
    }

    if(stars >= 3.5) {
      return (
        <span className="stars three-half-star">
        </span>
      )
    }
    if(stars >= 3) {
      return (
        <span className="stars three-star">
        </span>
      )
    }

    if(stars >= 2.5) {
      return (
        <span className="stars two-half-star">
        </span>
      )
    }
    if(stars >= 2) {
      return (
        <span className="stars two-star">
        </span>
      )
    }

    if(stars >= 1.5) {
      return (
        <span className="stars one-half-star">
        </span>
      )
    }
    if(stars >= 1) {
      return (
        <span className="stars one-star">
        </span>
      )
    }
    if(stars >= 0.5) {
      return (
        <span className="stars half-star">
        </span>
      )
    }
    if(stars <= 0) {
      return (
        <span className="stars no-star">
        </span>
      )
    }
  },
  renderDistance(userGeo, resultGeo){
    const user = userGeo.split(',')
    const userLat = parseFloat(user[0])
    const userLon = parseFloat(user[1])
    const start = {
      latitude: userLat,
      longitude: userLon
    }

    const end = {
      latitude: resultGeo.lat,
      longitude: resultGeo.lng
    }

    return (
      <span>About {parseInt(haversine(start, end))} miles away</span>
    )
  },
  render() {
    return(
      <div className="result">
        <a href={this.props.reserve_url}><img className="result-image" src={this.props.image_url} alt="Result Image"/></a>
          <div className="result-text">
          <a href={this.props.reserve_url}><h4 dangerouslySetInnerHTML={{ __html: this.props._highlightResult.name.value }}></h4></a>
          <span><span className="rating-number">{this.props.stars_count}</span>{this.renderStarsClass()}({this.props.reviews_count} reviews)</span>
          <span>{this.props.food_type} | {this.props.area} | {this.props.price_range}</span>
          {!this.props.userLocation ? '' : this.renderDistance(this.props.userLocation, this.props._geoloc)}
        </div>
      </div>
    )
  }
})

export default Result
