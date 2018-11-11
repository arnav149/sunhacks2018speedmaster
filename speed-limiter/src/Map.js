import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import './Map.css';


let speed,distance,time;

export class MapContainer extends React.Component {

  constructor()
  {
    super();
    this.state={
      lat:0,
      long:0,
      distance:0,
      time:0
    }
  }


  onButtonChange=()=>{
    fetch('http://localhost:3000/parent')
    .then(res=>res.json())
    .then(data=>this.setState(data))
    .catch(err=>console.log(err))
  }


  onAlmostFinalChange=()=>{
    // const parsedlat = queryString.parse(this.state.lat);
    // const slat = queryString.stringify(parsedlat);
    // const parsedlong = queryString.parse(this.state.long);
    // const slang = queryString.stringify(parsedlong);
    // const parsedendlat = queryString.parse(this.props.endlat);
    // const sendlang = queryString.stringify()
    // const parsedendlong = queryString.parse(this.props.endlong);
    //console.log(this.props.endlat);
    console.log('Setting speed');
    axios.get('http://localhost:3000/speed')
    //.then(res=>console.log(res))
    .then(res=>this.setState({distance:res.data.dist,time:res.data.time}))
    .catch(err=>console.log(err))
  //   direction({
  //   origin:`${this.state.lat},${this.state.long}`,
  //   destination:`${this.props.endlat},${this.props.endlong}`
  // })
  // .then(function(result){
  //   console.log(result);
  // })
  //
  //   if(speed!==0)
  //   alert('Speed Limited')
  //   fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.lat},${this.state.long}&destinations=${this.props.endlat},${this.props.endlong}&key=AIzaSyApsiMJBsI6piScQHEWkYOEbUU211S2M30`,{mode:'no-cors'})
  //   .then(res=>console.log(res.data.rows[0].elements[0].distance.value))
    // let distance = this.state.distance;
    // let time = this.state.time;
    // time=time/3600;
    // distance=distance/1000;
    // speed= distance/time;
    // console.log(speed);
    alert('Almost Done!Press Limit Speed to finally limit the speed')
  }

  onFinalChange=()=>{
    distance=this.state.distance;
    time=this.state.time;
    console.log(distance,time);
    speed=((distance/1000)/(time/3600))+25;
    alert('Speed has been limited to ' + speed+' km/hr');
    alert("If you're not satisfied you can set the speed manually!Type in to do that.")
  }

  manual=(event)=>{
    speed = parseFloat(event.target.value);
  }

  speed=()=>
  {
    alert('Speed has been limited to ' + speed+' km/hr');
  }

  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }

    return (
      <div>
      <div className='center'>
      <button className='ma2 bg-light-green outline w-33.33 pa3 grow mr2' onClick={this.onButtonChange}>Get Current Location</button>
      <button className='ma2 bg-light-green outline w-33.33 pa3 grow mr2' onClick={this.onAlmostFinalChange}>Set Speed</button>
      <button className='ma2 bg-light-green outline w-33.33 pa3 grow mr2' onClick={this.onFinalChange}>Limit Speed</button>
      </div>
      <div>
      <p className='f3 tc'>Set Speed Manually</p>
      </div>
      <div className='flex'>
      <input placeholder='Set Speed Manually' className='outline bg-light-blue w-50 pa2 ma3 mr2' type='text' onChange={this.manual}></input>
      <button className='outline bg-light-green w-50 pa2 ma3 grow mr2' onClick={this.speed}>Check the speed</button>
      </div>
      <div>
      <Map style={style} google={this.props.google} initialCenter={{lat:0,lng:0}} center={{lat:this.state.lat,lng:this.state.long}} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                position={{lat:this.state.lat,lng:this.state.long}}name={'Current location'} />

      </Map>
      </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyApsiMJBsI6piScQHEWkYOEbUU211S2M30'
})(MapContainer)
