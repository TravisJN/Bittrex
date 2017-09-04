import React, { Component } from 'react';
import './App.js';
import PriceDisplay from './components/PriceDisplay.js'
import PriceTable from './components/PriceTable.js'

export class Display extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    return( 
      <div>
        <PriceDisplay />
        <PriceTable />
      </div>
    )
  }
}

export default Display;