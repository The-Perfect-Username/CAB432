var express = require('express');
var path = require('path')
var http = require('http');
var app = express();
var api = require("./APIs/yelp.js");
//var merge = require('merge');
//var yelp = require('node-yelp-api');
var Yelp = require('yelp');

/*
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');*/

const hostname = "localhost";
const port = 3000;

var yelp = new Yelp({
	consumer_key: '_1Kxu0NdU02g_myZiaaVMQ',
	consumer_secret: 'cQJNZiyseTLos6GPESktwOSAbQ0',
	token: 'UoJZd3FQZaPfD-fpfTkYEmZad7IMmJIr',
	token_secret: 'FfGhCbWh-kAOd55qOZhulhgttuY',
});

// Global variable
// JSON result of Yelp API
var jsonResult;

function REST() {
	var self = this;
}

REST.prototype.cool = function() {
	
};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + '/public'));
});

app.get('/yelp', function(req, res) {
	yelp.search({term: "food", location: "Cairns"})
	.then(function (data) {
		jsonResult = data;
	})
	.catch(function (err) {
		console.error(err);
	});
	res.json(jsonResult);
});

app.get('/yelp/:term/:location', function(req, res) {

	var term = req.params.term;
	var location = req.params.location;
	yelp.search({term, location})
	.then(function (data) {
		jsonResult = data;
	})
	.catch(function (err) {
		console.error(err);
	});
	res.json(jsonResult);	
});

app.listen(port, function () {
	console.log("Express app listening at http://" + hostname + ":" + port + "/");
});

new REST();