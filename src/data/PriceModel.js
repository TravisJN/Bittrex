var _ = require('underscore');

// Simple data store and API request handler
export class PriceModel {
    
    baseUrl = 'http://localhost:8080';
    mData = {
        balances: [],
        getBTCPrice: [{
            Last: 0
        }],
        marketSummaries: []
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
        marketSummaries: {
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

    constructor() {
        // initialize with the fetch for all markets
        this.fetchData('marketSummaries');
    }

    get data() {
        return this.mData;
    }

    get balances() {
        return this.mData.balances;
    }

    get currentBTCPrice() {
        return this.mData.BTCPrice && this.mData.BTCPrice.length && this.mData.BTCPrice[0] && this.mData.BTCPrice[0].Last.toFixed(2);
    }

    get dollarSum() {
        let sum = 0;

        if (this.mData.balances && this.mData.balances.length) {
            // sum up the total balance
            return this.mData.balances.reduce((aSum, aCurrency) => {
                return Number(aSum) + Number(this.getDollarValue(aCurrency.Currency));
            }, sum).toFixed(2);
        }
    }

    getLastPrice(aSymbol) {
        // Traverse the marketsummary data to find a match
        var marketObject = this.mData.marketSummaries.find((aMarket) => {
            return aMarket.MarketName.indexOf(aSymbol) > -1;
        });

        if(marketObject) {
            return marketObject.Last;
        }
    }

    getBTCValue(aSymbol) {
        var currentBalance,
            lastPrice = this.getLastPrice(aSymbol);
        
            
            currentBalance = this.mData.balances.find((aBalance) => {
                return aBalance.Currency === aSymbol;
            });
            
            if (aSymbol === 'BTC') {
                return currentBalance.Balance;
            }

        return (currentBalance.Balance * lastPrice).toFixed(8);
    }

    getDollarValue(aSymbol) {
        var currencyBTCValue = this.getBTCValue(aSymbol);

        return (currencyBTCValue * this.currentBTCPrice).toFixed(2);
    }

    parseData(aData, aEndPointKey) {
        var body = aData.result,
            parsedData;

        switch(aEndPointKey) {
            case 'balances':
                parsedData = body.filter((aCurrency) => {
                    return aCurrency.Balance > 0;
                });
                break;
            default:
                parsedData = body;
                break;
        }

        this.mData[aEndPointKey] = parsedData;
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
        })
        .catch((error) => {
            console.log(aEndPoint + ' fetch error: ', error);
        });
    }
}

export default PriceModel;