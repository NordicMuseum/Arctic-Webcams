import React, { Component } from 'react'
import './Thumbnail.css'

class Thumbnail extends Component {
  render () {
    const style = {
      backgroundImage: `url(${this.props.image})`
    }

    return (
      <div className='Thumbnail' onClick={this.props.onClick} style={style} />
    )
  }
}

export default Thumbnail
