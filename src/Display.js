import React from 'react';
import './App.js';
import PriceDisplay from './components/PriceDisplay.js';
import PriceTable from './components/PriceTable.js';
import PriceModel from './data/PriceModel';

export class Display extends React.Component{
  constructor(props) {
      super(props);

      this.mPriceModel = new PriceModel();
  }

  render() {
    return( 
      <div>
        <PriceDisplay model={this.mPriceModel}/>
        <PriceTable />
      </div>
    )
  }
}

export default Display;