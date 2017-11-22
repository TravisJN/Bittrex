import React from 'react';
import '../App.js';
import TextInputForm from './TextInputForm.js';
//import PriceModel from '../data/PriceModel.js';

export class PriceDisplay extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            balances: [],
            price: 0,
            onSubmit: this.onSubmit.bind(this)
        }

        this.mModel = props.model;
    }

    render() {
        var balances = this.state.balances
                        .filter((aCurrency) => {
                            return aCurrency.Balance > 0;
                        })
                        .map((aCurrency) => {
                            return <li key={aCurrency.Currency}>{aCurrency.Currency} : {aCurrency.Balance}</li>
                        });

        return( 
        <div>
            <TextInputForm onSubmit={this.state.onSubmit}/>
            <ul>{balances}</ul>
        </div>
        )
    }

    onSubmit(event) {
        //var tickerSymbol = event.target.value,
        var endPoint = 'getBalances';

        this.mModel.fetchData(endPoint).then((value) => {
            this.setState({balances: value.result});
        })
    }
}

export default PriceDisplay;