var _ = require('underscore');

export class PriceModel {
    
    baseUrl = 'http://localhost:8080';
    mData = {};

    endPointMap = {
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
        },
        getBalances: {
            path: '/account/getbalances'
        }
    }

    get data() {
        return this.mData;
    }

    buildQueryString(aEndPoint) {
        var urlString = this.baseUrl + aEndPoint.path + '?';

        // Could be imrpoved with functional iterator
        for (var key in aEndPoint.queryParams) {
            urlString += key + '=' + aEndPoint[key] + '&';
        }

        return urlString;
    }

    fetchData(aEndPoint, aQueryParams) {
        let endPoint = this.endPointMap[aEndPoint],
            fullUrl;

        if (endPoint) {
            fullUrl = {
                path: endPoint.path,
                queryParams: _.defaults(aQueryParams, endPoint.queryParams)
            }

            return this.makeRequest(this.buildQueryString(fullUrl))
        }


    }
    
    makeRequest(aUrl) {

        return fetch(aUrl, {  
            method: 'GET',
            headers: {
                'Access-Control-Request-Method': 'GET',
            }
        })
        .then((response) => {
            return this.mData = response.json();  // Note: intentional assignment
        })
        .catch((error) => {
            console.log('error', error);
            this.setState({price: 'ERROR'});
        });
    }
}

export default PriceModel;