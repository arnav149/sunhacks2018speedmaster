/*
* Name: Darcy Hughes
* Sunhacks 2018
 */

import React, { Component } from "react";
import MapContainer from './Map';
import Geocode from 'react-geocode';
import './Entry.css'

Geocode.setApiKey('AIzaSyApsiMJBsI6piScQHEWkYOEbUU211S2M30');

class Entry extends Component {

  constructor()
  {
    super();
    this.state={
    end:'',
    endlat:0,
    endlong:0
   }
  }


  onEndChange=(event)=>{
    this.setState({end:event.target.value})
  }

  // componentDidMount(){
  //   Geocode.fromAddress(`${this.state.end}`)
  //   .then(res=>{
  //     this.setState({endlat:res.results[0].geometry.location.lat,endlong:res.results[0].geometry.location.lng})
  //   })
  // }
  onClickChange=()=>{
    Geocode.fromAddress(`${this.state.end}`)
    .then(res=>{
      this.setState({endlat:res.results[0].geometry.location.lat,endlong:res.results[0].geometry.location.lng})
    })

    //console.log(this.state.endlat,this.state.endlong)
    //this.setState({endlat:data.candidates[0].geometry.location.lat,endlong:data.candidates[0].geometry.location.long})
    // fetch('http://localhost:3000/latitude',{
    //   method: 'post',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({endlat: this.state.endlat,endlong:this.state.endlong})
    // })
    // .catch(err=>console.log(err))
    alert('Speed will now be limited according the position entered,please press Continue!')

  }

 onSecondChange=()=>{
    console.log(this.state.endlat,this.state.endlong);
    fetch('http://localhost:3000/latitude',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({endlat: this.state.endlat,endlong:this.state.endlong})
    })
    .catch(err=>console.log(err))
    alert('Please press Set Speed to make the server set the speed for you');
 }
  // componentDidMount(){
  //   fetch('http://localhost:3000/latitude',{
  //     method: 'post',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({endlat: this.state.endlat,endlong:this.state.endlong})
  //   })
  //   .catch(err=>console.log(err))
  // }

    render() {
        return (
            <div>
                <h3 className='tc' >
                    Enter desired destination below
                </h3>
                    <input
                        id="end"
                        className='center bg-light-blue outline black-80 w-60 pa2'
                        name="Destination"
                        placeholder='Destination'
                        onChange={this.onEndChange}/>
                    <p/>
                    <button className='outline bg-light-green center w-30 ma5 grow pa2' type="submit" onClick={this.onClickChange}>Go</button>
                    <button className='outline bg-light-green center w-30 ma5 grow pa2' type="submit" onClick={this.onSecondChange}>Continue</button>
                    <div><MapContainer endlat={this.state.endlat} endlong={this.state.endlong}/></div>
            </div>
        );
    }
}
export default Entry;
