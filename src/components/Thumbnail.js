import React, { Component } from 'react'
import { flag } from 'country-code-emoji'
import './Thumbnail.css'

class Thumbnail extends Component {
  render () {
    const style = {
      backgroundImage: `url(${this.props.image})`
    }

    return (
      <div className='Thumbnail' onClick={this.props.onClick} style={style}>{flag(this.props.location.country_code)} {this.props.location.city}</div>
    )
  }
}

export default Thumbnail
