/*
* Name: Darcy Hughes
* Sunhacks 2018
 */

import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MapContainer from './Map';
import Geocode from 'react-geocode';

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

  onClickChange=()=>{
    Geocode.fromAddress(`${this.state.end}`)
    .then(res=>{
      this.setState({endlat:res.results[0].geometry.location.lat,endlong:res.results[0].geometry.location.lng})
    })
    console.log(this.state.endlat,this.state.endlong)
    //this.setState({endlat:data.candidates[0].geometry.location.lat,endlong:data.candidates[0].geometry.location.long})
  }

    render() {
        return (
            <Paper>
                <Typography component="h2" variant="h5" gutterBottom>
                    Enter desired destination below
                </Typography>
                    <TextField
                        id="end"
                        label="Destination"
                        margin="normal" onChange={this.onEndChange}/>
                    <p/>
                    <Button type="submit" variant="contained" color="primary" onClick={this.onClickChange}>Go</Button>
                    <Paper><MapContainer endlat={this.state.endlat} endlong={this.state.endlong}/></Paper>
            </Paper>
        );
    }
}
export default Entry;
