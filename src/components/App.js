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
    console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY)

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

    window.setInterval(update, 60)
  }

  async fetchWebcams () {
    const ids = require('../config')['webcamIds'].join(',')

    const url =
      `/api/webcams/list/webcam=${ids}/limit=30$?lang=en&show=webcams:image,player,location`

    const {
      result: {
        webcams: wc
      }
    } = await ky(url).json()

    const webcams = wc.map(({ id, image, title, player, location, url }) => ({
      id,
      title,
      player,
      image: image.current.preview,
      location,
      url: url.current.desktop,
      temperature: ''
    }))

    const byIdDESC = (a, b) => Number(a.location.longitude) - Number(b.location.longitude)

    this.setState({
      webcams: webcams.sort(byIdDESC)
    })
  }

  async fetchTemperatures (selectedId) {
    console.log('fetchTemperatures ' + selectedId)

    const webcam = this.state.webcams.find(({ id }) => {
      return id === selectedId
    })

    console.log('fetchTemperatures ' + webcam.id)

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + webcam.location.latitude + '&lon=' + webcam.location.longitude + '&appid=' + process.env.REACT_APP_OPENWEATHERMAP_API_KEY

    const result = await ky(url).json()

    const temperature = Math.round(result.main.temp-273.15, 0) + ' °C'

    this.setState({
      selectedTemperature: temperature
    })
  }

  openModal (id) {

    this.setState({
      modalIsOpen: true,
      selectedWebcamId: id
    })

    this.fetchTemperatures(id)
  }

  closeModal () {
    this.setState({
      modalIsOpen: false,
      selectedWebcamId: null,
      selectedTemperature: ''
    })
  }

  render () {
    console.log(this.state)

    const webcams = this.state.webcams.map((props, i) => (
      <Thumbnail key={i} {...props} onClick={this.openModal.bind(this, props.id)} />
    ))

    const webcam = this.state.webcams.find(({ id }) => {
      return id === this.state.selectedWebcamId
    })

    const imageURL = 'images/' + this.state.selectedWebcamId + '.png'

    //TODO: can we autoplay without opening a popup window?

    return (
      <div className='App'>
        <section className='Webcams'>
          {webcams}
        </section>
        <section className='Courtesy'>
          <p>Webcams provided by <a href="http://webcams.travel/api">webcams.travel</a></p>
        </section>

        <Modal className='Modal' overlayClassName='Overlay' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}>
          {this.state.selectedWebcamId &&
            <div className='ModalContainer'>
            <div className='ModalContent'>
              <button className="ModalCloseButton" onClick={this.closeModal.bind(this)}>X</button>
              <p><a href={webcam.url}><img className="ModalWebcamImage" src={webcam.image} alt={webcam.location.city}/></a></p>
              <h1>📍 {webcam.location.city}</h1>
              <p><span className="DataType">Plats/Place:</span>{flag(webcam.location.country_code)} {webcam.location.country}</p>
              <p className="Time"><span className="DataType">Aktuell tid/Current Time:</span>🕑 <Moment format="HH:mm" tz={webcam.location.timezone} /></p>
              <p className="Temperature"><span className="DataType">Aktuell temperatur/Current Temperature:</span>🌡 {this.state.selectedTemperature}</p>
            </div>
            <div className='ModalContent'>
              <p><img className='ModalMapImage' src={imageURL} alt={webcam.location.city}/></p>
              <p className='FinePrint'>Temperature provided by OpenWeatherMap, CC BY-SA 4.0</p>
              <p className='FinePrint'>Webcams provided by <a href="http://webcams.travel/api">webcams.travel</a></p>
            </div>
            </div>
          }
        </Modal>
      </div>
    )
  }
}

export default App
