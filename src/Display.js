import React from 'react';
import './App.js';
import PriceDisplay from './components/PriceDisplay.js';
import PriceTable from './components/PriceTable.js';
import PriceModel from './data/PriceModel';
import { ControlPanel } from './components/ControlPanel';
import CurrentBTCPriceDisplay from './components/CurrentBTCPriceDisplay';

export class Display extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            balances: [],
            currentBTCPrice: 0,
            btcLoadingAnimation: false
        }

        this.mPriceModel = new PriceModel();

    }
    

  buttonClicked(event, aButton) {
    console.log(aButton.label + ' button clicked');

    if(aButton.endPointKey === 'BTCPrice') {
        this.setState({btcLoadingAnimation: true})
    }

    this.mPriceModel.fetchData(aButton.endPointKey).then((responseData) => {
        this.setState({balances: this.mPriceModel.balances});
        this.setState({currentBTCPrice: this.mPriceModel.currentBTCPrice.Last});
        this.setState({btcLoadingAnimation: false})
    });
  }

  render() {
    return( 
      <div>
        <ControlPanel buttonClicked={this.buttonClicked.bind(this)}/>
        <CurrentBTCPriceDisplay loadingAnimation={this.state.btcLoadingAnimation} price={this.state.currentBTCPrice}/>
        <PriceDisplay model={this.mPriceModel} balances={this.state.balances}/>
        <PriceTable />
      </div>
    )
  }
}

export default Display;