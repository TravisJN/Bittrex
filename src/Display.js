import React from 'react';
import './App.js';
import PriceDisplay from './components/PriceDisplay.js';
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
    
    componentDidMount() {
        // Initialize the view with the data
        this.mPriceModel.fetchData('BTCPrice').then((responseData) => {
            this.setState({currentBTCPrice: this.mPriceModel.currentBTCPrice});
            this.mPriceModel.fetchData('balances').then((responseData) => {
                this.setState({balances: this.mPriceModel.balances});            
            });
        });
    }

    buttonClicked(event, aButton) {
        if(aButton.endPointKey === 'BTCPrice') {
            this.setState({btcLoadingAnimation: true})
        }

        this.mPriceModel.fetchData(aButton.endPointKey).then((responseData) => {
            this.setState({balances: this.mPriceModel.balances});
            this.setState({currentBTCPrice: this.mPriceModel.currentBTCPrice});
            this.setState({btcLoadingAnimation: false})
        });
    }

    render() {
        return( 
        <div>
            <ControlPanel buttonClicked={this.buttonClicked.bind(this)}/>
            <CurrentBTCPriceDisplay loadingAnimation={this.state.btcLoadingAnimation} price={this.state.currentBTCPrice}/>
            <PriceDisplay model={this.mPriceModel} balances={this.state.balances}/>
        </div>
        )
    }
}

export default Display;