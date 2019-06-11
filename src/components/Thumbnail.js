import React, { Component } from 'react'
import { flag } from 'country-code-emoji'
import './Thumbnail.css'

class Thumbnail extends Component {

  constructor(props) {
  	super(props)
  	this.state = {
  		temperature: null
  	}
  }

  componentDidMount() {
  	const thumbnailApiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.location.latitude + '&lon=' + this.props.location.longitude + '&appid=8a69f1003314e61a61759aeeda535d22'

  	fetch(thumbnailApiEndpoint)
      .then(response => response.json())
      .then(data => this.setState({temperature: Math.round(data.main.temp-273.15, 0) + ' °C'}))
  }

  render () {
    const style = {
      backgroundImage: `url(${this.props.image})`
    }

    return (
      <div className='Thumbnail' onClick={this.props.onClick} style={style}><h2>{flag(this.props.location.country_code)} {this.props.location.city} <span className='temperature'>{this.state.temperature}</span></h2></div>
    )
  }
}

export default Thumbnail
