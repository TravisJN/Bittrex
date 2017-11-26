// node proxy
var express = require('express');
var fetch = require('node-fetch');
var app = express();
var sha512 = require('sha512');
var apiKey = require('../private/Keys.js');


var getAPISign = function(aUrl) {
    var secret = apiKey.secret;
    var hasher = sha512.hmac(secret);
    //can also call 'update(message)' and then 'finalize()'
    var final = hasher.finalize(aUrl);
    return final.toString('hex');
}

var getAPIKey = function() {
    return apiKey.apiKey;
}

var getNonce = function() {
    return Math.floor(new Date().getTime());
};

var baseUrl = 'https://bittrex.com/api/v1.1',
    queryParams = 'apikey=' + getAPIKey() + '&nonce=' + getNonce(),
    url;

app.use(function(req, res, next) {
    console.log(req.path);
    url = baseUrl + req.originalUrl + queryParams;

    console.log(url);

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', function (req, res) {
    fetch(url, {
        headers: {
            'apisign': getAPISign(url)
        }
    })
    .then(function(response) {
        return response.json();
    }).then(function(body) {
        res.send(body);
    });
});

var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Bittrex proxy listening at ", host, port);
});

