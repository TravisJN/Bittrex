import React, { Component } from 'react';
import './App.js';
import PriceDisplay from './components/PriceDisplay.js'

export class Display extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    return( 
      <div>
        <PriceDisplay />
      </div>
    )
  }
}

export default Display;