import React from 'react';
import '../App.js';
import TextInputForm from './TextInputForm.js';
//import KEYS from '../private/Keys.js'

export class PriceDisplay extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            price: 0,

            queryParams: {
                apikey: '',//KEYS.apiKey,
                nonce: this.getNonce()
            },

            headers: {
                apisign: this.getAPISign()
            },

            onSubmit: this.onSubmit.bind(this)
        }

        this.fetchPrice();
    }

    render() {
        return( 
        <div>
            <TextInputForm onSubmit={this.state.onSubmit}/>
            <p>ETH: {this.state.price}</p> 
        </div>
        )
    }

    onSubmit(event) {
        var tickerSymbol = event.target.value;
        this.fetchPrice();
    }

    getAPISign() {

    }

    getAPIKey() {
        return '';
    }

	getNonce() {
		return Math.floor(new Date().getTime());
	};

    fetchPrice() {
        const baseUrl = 'https://bittrex.com/api/v1.1',
            endPoint = '/public/getmarkets',
            url = baseUrl + endPoint + '?apikey=' + this.getAPIKey() + '&nonce=' + this.getNonce();

        // perform business logic to fetch price
        fetch(url, {  
            //asdf
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => {
            // console.log(response);
            // this.setState({markets: response});
            return response;
        })
        .catch((error) => {
            console.log(error);
            this.setState({price: 'ERROR'});
        });
        // pass data to PriceModel
    }
}

export default PriceDisplay;