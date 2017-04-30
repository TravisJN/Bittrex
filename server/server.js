// node proxy
var express = require('express');
var fetch = require('node-fetch');
var app = express();

var getAPISign = function() {

}

var getAPIKey = function() {
    return '';
}

var getNonce = function() {
    return Math.floor(new Date().getTime());
};

var baseUrl = 'https://bittrex.com/api/v1.1',
    //endPoint = '/public/getmarkets',
    queryParams = '?apikey=' + getAPIKey() + '&nonce=' + getNonce(),
    url;

app.use(function(req, res, next) {
    console.log(req.path);
    url = baseUrl + req.path;
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', function (req, res) {
    console.log('getting')
    fetch(url)
    .then(function(response) {
        return response.json();
    }).then(function(body) {
        res.send(body);
    });
});

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at ", host, port)
});

