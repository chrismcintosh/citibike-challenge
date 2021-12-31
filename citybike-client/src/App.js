import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";


// Replace Empty Square with Icon
const L = require('leaflet');
const myIcon = L.icon({
  iconUrl: require('./marker.svg'),
  iconSize: [16,16],
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001/",
      lat: 25.797651558015108,
      lng: -80.16283456162486,
      zoom: 13,
      stations:[]
    };

  }
  
  componentDidMount() {
    // Get Data on Load
    this.getData()

    // Get Data on set interval
    setInterval(()=>{
      this.getData()
    },60000)
  }

  getData = () =>{
    const self= this
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("citybike", function(data){
      self.setState({stations: data.stations})
    })
  }

  render() {
    const { stations } = this.state;
    return (

      <div className="map">
        <h1> City Bikes in Miami </h1>          
        <Map className="map-container" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            stations.length > 0 && stations.map((station)=>(
              <Marker icon={myIcon} key={station.id} position={[station.latitude, station.longitude]}>     
                {console.log(station)}          
                <Popup>
                  <h2>{station.name}</h2>
                  <h3>Empty slots: {station.empty_slots}</h3>
                  <h3>Available Bikes: {station.free_bikes}</h3>
                </Popup>
              </Marker>
            ))
          } 
        </Map>
      </div>
    );
  }
}
export default App;
