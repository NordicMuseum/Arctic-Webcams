import React, { Component } from 'react'
import { flag } from 'country-code-emoji'
import Moment from 'react-moment'
import 'moment-timezone'
import './Thumbnail.css'

class Thumbnail extends Component {

  constructor(props) {
  	super(props)
  	this.state = {
  		temperature: null
  	}
  }

  componentDidMount() {
  	const thumbnailApiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.location.latitude + '&lon=' + this.props.location.longitude + '&appid=' + process.env.REACT_APP_OPENWEATHERMAP_API_KEY

  	fetch(thumbnailApiEndpoint)
      .then(response => response.json())
      .then(data => this.setState({temperature: Math.round(data.main.temp-273.15, 0) + ' °C'}))
  }

  render () {
    const style = {
      backgroundImage: `url(${this.props.image})`
    }

    return (
      <div className='Thumbnail' onClick={this.props.onClick} style={style}><h2>{flag(this.props.location.country_code)} {this.props.location.city}</h2><p>🕑 <Moment format="HH:mm" tz={this.props.location.timezone} /> 🌡 {this.state.temperature}</p></div>
    )
  }
}

export default Thumbnail
