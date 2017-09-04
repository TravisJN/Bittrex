import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './Display.js';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Bittrex Portal</h2>
        </div>

        <p className="App-intro"></p>
  
        <div className="App-Body">
          <Display />
        </div>
      </div>
    );
  }
}

export default App;
