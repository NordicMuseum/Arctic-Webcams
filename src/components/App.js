import React, { Component } from 'react'
import ky from 'ky'
import './App.css'
import Modal from 'react-modal'
import Thumbnail from './Thumbnail'
import { flag } from 'country-code-emoji'
import Moment from 'react-moment'
import 'moment-timezone'

Modal.setAppElement(document.getElementById('root'))

class App extends Component {
  constructor (props) {

    super(props)

    this.state = {
      modalIsOpen: false,
      selectedWebcamId: null,
      webcams: [],
      selectedTemperature: ''
    }

    const update = () => {
      this.fetchWebcams()
    }

    this.fetchWebcams()

    window.setInterval(update, 60000)
  }

  async fetchWebcams () {

    const ids = require('../config')['webcamIds'].join(',')

    const webcamUrl =
      `https://api.windy.com/webcams/api/v3/webcams?lang=en&limit=30&include=images,player,location,urls&webcamIds=${ids}`

    const {
      webcams: wc
    } = await ky(webcamUrl, {headers: {'x-windy-api-key': 'b23CWoHW3lKIlfQOQBGkv8yVJPx1so46'}}).json()

    const webcams = wc.map(({ webcamId, images, title, player, location, urls }) => ({
      webcamId,
      title,
      player,
      images: images.current.preview,
      location,
      urls: urls.detail,
      temperature: ''
    }))

    const byIdDESC = (a, b) => Number(a.location.longitude) - Number(b.location.longitude)

    this.setState({
      webcams: webcams.sort(byIdDESC)
    })
  }

  async fetchTemperatures (selectedWebcamId) {
    console.log('fetchTemperatures ' + selectedWebcamId)

    const webcam = this.state.webcams.find(({ webcamId }) => {
      return webcamId === selectedWebcamId
    })

    console.log('fetchTemperatures ' + webcam.webcamId)

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + webcam.location.latitude + '&lon=' + webcam.location.longitude + '&appid=' + process.env.REACT_APP_OPENWEATHERMAP_API_KEY

    const result = await ky(url).json()

    const temperature = Math.round(result.main.temp-273.15, 0) + ' °C'

    this.setState({
      selectedTemperature: temperature
    })
  }

  openModal (webcamId) {

    this.setState({
      modalIsOpen: true,
      selectedWebcamId: webcamId
    })

    this.fetchTemperatures(webcamId)
  }

  closeModal () {
    this.setState({
      modalIsOpen: false,
      selectedWebcamId: null,
      selectedTemperature: ''
    })
  }

  render () {

    const webcams = this.state.webcams.map((props, i) => (
      <Thumbnail key={i} {...props} onClick={this.openModal.bind(this, props.webcamId)} />
    ))

    const webcam = this.state.webcams.find(({ webcamId }) => {
      return webcamId === this.state.selectedWebcamId
    })

    const imageURL = 'images/' + this.state.selectedWebcamId + '.png'

    //TODO: can we autoplay without opening a popup window?

    return (
      <div className='App'>
        <section className='Webcams'>
          {webcams}
        </section>
        <section className='Courtesy'>
          <p>Webcams provided by <a href="https://api.windy.com/webcams">Windy.com</a></p>
        </section>

        <Modal className='Modal' overlayClassName='Overlay' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}>
          {this.state.selectedWebcamId &&
            <div className='ModalContainer'>
            <div className='ModalContent'>
              <button className="ModalCloseButton" onClick={this.closeModal.bind(this)}>X</button>
              <p><a href={webcam.urls}><img className="ModalWebcamImage" src={webcam.images} alt={webcam.location.city}/></a></p>
              <h1><span role="img" aria-label="pin">📍</span> {webcam.location.city}</h1>
              <p><span className="DataType">Plats/Place:</span>{flag(webcam.location.country_code)} {webcam.location.country}</p>
              <p className="Temperature"><span className="DataType">Aktuell temperatur/Current Temperature:</span>🌡 {this.state.selectedTemperature}</p>
            </div>
            <div className='ModalContent'>
              <p><img className='ModalMapImage' src={imageURL} alt={webcam.location.city}/></p>
              <p className='FinePrint'>Temperature provided by OpenWeatherMap, CC BY-SA 4.0</p>
              <p className='FinePrint'>Webcams provided by <a href="https://api.windy.com/webcams">Windy.com</a></p>
            </div>
            </div>
          }
        </Modal>
      </div>
    )
  }
}

export default App
