var _ = require('underscore');

export class PriceModel {
    
    baseUrl = 'http://localhost:8080';
    mData = {
        balances: [],
        getBTCPrice: 0
    };
    BTCPrice = 0;

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
        balances: {
            path: '/account/getbalances'
        },
        BTCPrice: {
            path: '/public/getmarketsummary',
            queryParams: {
                market: 'usdt-btc'
            }
        }
    }

    get data() {
        return this.mData;
    }

    get balances() {
        return this.mData.balances;
    }

    get currentBTCPrice() {
        return this.mData.BTCPrice && this.mData.BTCPrice.length && this.mData.BTCPrice[0];
    }

    parseData(aData, aEndPointKey) {
        var body = aData.result;

        this.mData[aEndPointKey] = body;
    }

    buildQueryString(aEndPoint) {
        var urlString = this.baseUrl + aEndPoint.path + '?';

        // Could be imrpoved with functional iterator
        for (var key in aEndPoint.queryParams) {
            urlString += key + '=' + aEndPoint.queryParams[key] + '&';
        }

        return urlString;
    }

    fetchData(aEndPoint, aQueryParams = {}) {
        let endPoint = this.endPointMap[aEndPoint],
            fullUrl;

        if (endPoint) {
            fullUrl = {
                path: endPoint.path,
                queryParams: _.defaults(aQueryParams, endPoint.queryParams)
            }

            return this.makeRequest(this.buildQueryString(fullUrl), aEndPoint);
        }
    }
    
    /**
     * @description This function makes the actual GET request with whatever url string is passed
     *              in, then it sets the response data to mData and returns the promise 
     * @param {string} aUrl The fully built url string
     * @param {string} aEndPoint The endpoint key used for mapping the response data correctly
     */
    // TODO: handle the setting of data better so it's not overwritten on every request
    makeRequest(aUrl, aEndPoint) {
        return fetch(aUrl, {  
            method: 'GET',
            headers: {
                'Access-Control-Request-Method': 'GET',
            }
        })
        .then((response) => {
            // Don't edit this first then statement or it will fuck everything up
            return response.json();
        }).then((responseJson) => {
            return this.parseData(responseJson, aEndPoint);
            console.log(responseJson);
        })
        .catch((error) => {
            console.log('error', error);
            this.setState({price: 'ERROR'});
        });
    }
}

export default PriceModel;