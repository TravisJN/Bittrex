import React from 'react';
import '../App.js';
import TextInputForm from './TextInputForm.js';
//import KEYS from '../private/Keys.js'

export class PriceDisplay extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            price: 0,
            onSubmit: this.onSubmit.bind(this)
        }
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
        this.fetchPrice().then((value) => {
            this.setState({price: value.result[0].BaseCurrency});
            console.log(value);
        })
    }

    fetchPrice() {
         return fetch('http://localhost:8080', {  
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