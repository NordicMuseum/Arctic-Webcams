import React, { Component } from 'react';
import Moment from 'react-moment';
import Img from 'react-image';
import 'moment-timezone';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "image1": "https://images.webcams.travel/preview/1511478446.jpg",
      "image2": "https://images.webcams.travel/preview/1359811131.jpg",
      "image3": "https://images.webcams.travel/preview/1245062109.jpg",
      "image4": "https://images.webcams.travel/preview/1309962155.jpg",
      "image5": "https://images.webcams.travel/preview/1315334494.jpg",
      "image6": "https://images.webcams.travel/preview/1414396133.jpg",
      "image7": "https://images.webcams.travel/preview/1519211430.jpg",
      "image8": "https://images.webcams.travel/preview/1458268824.jpg",
      "image9": "https://images.webcams.travel/preview/1494830834.jpg",
      "image10": "https://images.webcams.travel/preview/1525694529.jpg",
      "image11": "https://images.webcams.travel/preview/1230662852.jpg",
      "image12": "https://images.webcams.travel/preview/1234951380.jpg",
      "image13": "https://images.webcams.travel/preview/1506868057.jpg",
      "image14": "https://images.webcams.travel/preview/1364438257.jpg",
      "key": "",
      "seconds": 0,
      isHidden: false, 
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
    this.setState({ key: Math.random() });
    let imageToChange = this.getRandomInt(15);
    switch (imageToChange) {
      case 0:
      this.setState({ image1: this.state.image1 + "?" + this.state.key});
      break;
      case 1:
      this.setState({ image2: this.state.image2 + "?" + this.state.key});
      break;
      case 2:
      this.setState({ image3: this.state.image3 + "?" + this.state.key});
      break;
      case 3:
      this.setState({ image4: this.state.image4 + "?" + this.state.key});
      break;
      case 4:
      this.setState({ image5: this.state.image5 + "?" + this.state.key});
      break;
      case 5:
      this.setState({ image6: this.state.image6 + "?" + this.state.key});
      break;
      case 6:
      this.setState({ image7: this.state.image7 + "?" + this.state.key});
      break;
      case 7:
      this.setState({ image8: this.state.image8 + "?" + this.state.key});
      break;
      case 8:
      this.setState({ image9: this.state.image9 + "?" + this.state.key});
      break;
      case 9:
      this.setState({ image10: this.state.image10 + "?" + this.state.key});
      break;
      case 10:
      this.setState({ image11: this.state.image11 + "?" + this.state.key});
      break;
      case 11:
      this.setState({ image12: this.state.image12 + "?" + this.state.key});
      break;
      case 12:
      this.setState({ image13: this.state.image13 + "?" + this.state.key});
      break;
      case 13:
      this.setState({ image14: this.state.image14 + "?" + this.state.key});
      break;
      default:
      break;
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
      <div class="wrapper">
      <div><Img src={this.state.image12} /><p><span role="img" aria-label="USA flag">🇺🇸</span> Diomede <Moment format="HH:mm" tz="America/Nome" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1278943657.jpg" /><p><span role="img" aria-label="USA flag">🇺🇸</span> Barrow <Moment format="HH:mm" tz="America/Anchorage" /></p></div>
      <div><Img src={this.state.image13} /><p><span role="img" aria-label="Canada flag">🇨🇦</span> Tulita <Moment format="HH:mm" tz="America/Yellowknife" /></p></div>
      <div><Img src={this.state.image8} /><p><span role="img" aria-label="Canada flag">🇨🇦</span> Pangnirtung <Moment format="HH:mm" tz="America/Pangnirtung" /></p></div>
      <div><Img src={this.state.image9} /><p><span role="img" aria-label="Canada flag">🇨🇦</span> Clyde River <Moment format="HH:mm" tz="America/Iqaluit" /></p></div>
      <div><Img src={this.state.image10} /><p><span role="img" aria-label="Canada flag">🇨🇦</span> Hall Beach Airport <Moment format="HH:mm" tz="America/Iqaluit" /></p></div>
      <div><Img src={this.state.image3} /><p><span role="img" aria-label="Greenland flag">🇬🇱</span> Kulusuk <Moment format="HH:mm" tz="America/Godthab" /></p></div>
      <div><Img src={this.state.image4} /><p><span role="img" aria-label="Greenland flag">🇬🇱</span> Nuuk <Moment format="HH:mm" tz="America/Godthab" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1216629503.jpg" /><p><span role="img" aria-label="Greenland flag">🇬🇱</span> Summit Camp <Moment format="HH:mm" tz="America/Godthab" /></p></div>
      <div><Img src={this.state.image6} /><p><span role="img" aria-label="Iceland flag">🇮🇸</span> Reykjavík <Moment format="HH:mm" tz="Atlantic/Reykjavik" /></p></div>
      <div><Img src={this.state.image7} /><p><span role="img" aria-label="Iceland flag">🇮🇸</span> Jökulsárlón <Moment format="HH:mm" tz="Atlantic/Reykjavik" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1482489649.jpg" /><p><span role="img" aria-label="Faroe flag">🇫🇴</span> Vágur <Moment format="HH:mm" tz="Atlantic/Faroe" /></p></div>
      <div><Img src={this.state.image11} /><p><span role="img" aria-label="Norway flag">🇳🇴</span> Bodø <Moment format="HH:mm" tz="Europe/Oslo" /></p></div>
      <div><Img src={this.state.image1} /><p><span role="img" aria-label="Norway flag">🇳🇴</span> Tromsø <Moment format="HH:mm" tz="Europe/Oslo" /></p></div>
      <div><Img src={this.state.image2} /><p><span role="img" aria-label="Norway flag">🇳🇴</span> Jan Mayen <Moment format="HH:mm" tz="Arctic/Longyearbyen"/></p></div>
      <div><Img src="https://images.webcams.travel/preview/1182187370.jpg" /><p><span role="img" aria-label="Norway flag">🇳🇴</span> Longyearbyen <Moment format="HH:mm" tz="Arctic/Longyearbyen" /></p></div>
      <div><Img src={this.state.image5} /><p><span role="img" aria-label="Sweden flag">🇸🇪</span> Kiruna <Moment format="HH:mm" tz="Europe/Stockholm" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1516775264.jpg" /><p><span role="img" aria-label="Sweden flag">🇸🇪</span> Låktatjåkko <Moment format="HH:mm" tz="Europe/Stockholm" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1369336627.jpg" /><p><span role="img" aria-label="Norway flag">🇳🇴</span> Nordkapp <Moment format="HH:mm" tz="Europe/Oslo" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1249042534.jpg" /><p><span role="img" aria-label="Finland flag">🇫🇮</span> Rovaniemi <Moment format="HH:mm" tz="Europe/Helsinki" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1311240378.jpg" /><p><span role="img" aria-label="Russia flag">🇷🇺</span> Murmansk <Moment format="HH:mm" tz="Europe/Moscow" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1461931908.jpg" /><p><span role="img" aria-label="Russia flag">🇷🇺</span> Nel’min Nos <Moment format="HH:mm" tz="Europe/Moscow" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1515276672.jpg" /><p><span role="img" aria-label="Russia flag">🇷🇺</span> Novy Urengoy <Moment format="HH:mm" tz="Asia/Yekaterinburg" /></p></div>
      <div><Img src="https://images.webcams.travel/preview/1509802759.jpg" /><p><span role="img" aria-label="Russia flag">🇷🇺</span> Magadan <Moment format="HH:mm" tz="Asia/Magadan" /></p></div>
      <div><Img src={this.state.image14} /><p><span role="img" aria-label="Russia flag">🇷🇺</span> Anadyr <Moment format="HH:mm" tz="Asia/Anadyr" /></p></div>
      </div>
      Webcams provided by <a href="http://webcams.travel/api/" target="_blank" rel="noopener noreferrer">webcams.travel</a> &mdash; <a href="http://lookr.com/add" target="_blank" rel="noopener noreferrer">add a webcam</a>
      </div>
      );
  }
}

export default App;
