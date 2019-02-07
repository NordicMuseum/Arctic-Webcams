import React, { Component } from 'react'
import ky from 'ky'
import './App.css'
import Modal from 'react-modal'
import Thumbnail from './Thumbnail'
import { flag } from 'country-code-emoji'

Modal.setAppElement(document.getElementById('root'))

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      selectedWebcamId: 0,
      webcams: []
    }

    const update = () => {
      this.fetchWebcams()
    }

    this.fetchWebcams()

    window.setInterval(update, 36000)
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

    const webcams = wc.map(({ id, image, title, player, location }) => ({
      id,
      title,
      player,
      image: image.current.preview,
      location
    }))

    const byIdDESC = (a, b) => Number(a.id) - Number(b.id)

    console.log(webcams[0].player);

    this.setState({
      webcams: webcams.sort(byIdDESC)
    })
  }

  openModal (id) {
    this.setState({
      modalIsOpen: true,
      selectedWebcamId: id
    })
  }

  closeModal () {
    this.setState({
      modalIsOpen: false,
      selectedWebcamId: undefined
    })
  }

  render () {
    const webcams = this.state.webcams.map((props, i) => (
      <Thumbnail key={i} {...props} onClick={this.openModal.bind(this, props.id)} />
    ))

    const webcam = this.state.webcams.find(({ id }) => {
      return id === this.state.selectedWebcamId
    })

    //TODO: can we autoplay without opening a popup window?

    return (
      <div className='App'>
        <section className='Webcams'>
          {webcams}
        </section>

        <Modal className='Modal' overlayClassName='Overlay' isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}>
          {this.state.selectedWebcamId &&
            <div>
              <h2>{flag(webcam.location.country_code)} {webcam.location.city}</h2>
              <iframe title="Player" src={webcam.player.year.embed + '&autoplay=1'}></iframe>
            </div>
          }
        </Modal>
      </div>
    )
  }
}

export default App
