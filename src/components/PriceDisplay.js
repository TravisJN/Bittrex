import React from 'react';
import '../App.js';
import TextInputForm from './TextInputForm.js';
//import KEYS from '../private/Keys.js'

export class PriceDisplay extends React.Component{
    endPoints = {
        getMarkets: {
            path: '/public/getmarkets'
        },
        getCurrencies: {
            path: '/public/getcurrencies'
        },
        getTicker: {
            path: '/public/getticker',
            queryParams: {
                market: '' // (required) a string literal for the market (ex: BTC-LTC)
            }
        },
        getMarketSummaries: {
            path: '/public/getmarketsummaries'
        },
        getMarketSummary: {
            path: '/public/getmarketsummary',
            queryParams: {
                market: '' // (required) a string literal for the market (ex: BTC-LTC)
            }
        },
        getOrderBook: {
            path: '/public/getorderbook',
            queryParams: {
                market: '', // (required) a string literal for the market (ex: BTC-LTC)
                type: '',   // (required) buy, sell or both to identify the type of orderbook to return
                depth: ''   // (optional) defaults to 20 - how deep of an order book to retrieve. Max is 50
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            balances: [],
            price: 0,
            onSubmit: this.onSubmit.bind(this)
        }
    }

    render() {
        var balances = this.state.balances.map((aCurrency) => {
            return <li>{aCurrency.Currency} : {aCurrency.Balance}</li>
        })
        return( 
        <div>
            <TextInputForm onSubmit={this.state.onSubmit}/>
            <ul>{balances}</ul>
        </div>
        )
    }

    onSubmit(event) {
        var tickerSymbol = event.target.value;
        // dispatch an action here
        this.fetchPrice().then((value) => {
            this.setState({balances: value.result});
            console.log(value);
        })
    }

    fetchPrice() {
        //var path = '/public/getmarkets';
        var path = '/account/getbalances',
            qp = '?apikey=4973ea1118f14c5eb9699bc4cf5f1c3a',
            url = ['http://localhost:8080', path, qp].join('');
         return fetch(url, {  
            method: 'GET',
            headers: {
                'Access-Control-Request-Method': 'GET',
            }
        })
        .then((response) => {
             return response.json();
        })
        .catch((error) => {
            console.log('error', error);
            this.setState({price: 'ERROR'});
        });
    }
}

export default PriceDisplay;