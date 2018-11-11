import React, { Component } from 'react';
import './App.css';
import Entry from './Entry';
import Bar from './Bar';
import Particles from 'react-particles-js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Bar/>
            <Particles className='parti'
     params={{
         particles: {
           number:{
             value:40,
             density:{
               enable:true,
               value_area:800
             }
           },
          move:
          {
            enable:true,
            speed:7
          },

         }
       }}/>
            <p/>
            <Entry/>
            <p/>
        </header>
      </div>
    );
  }
}

export default App;
