var express = require('express');
var path = require('path')
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
var api = require("./APIs/yelp.js");
var Yelp = require('yelp');

/*
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');*/

const hostname = "localhost";
const port = 3000;
/*
var yelp = new Yelp({
	consumer_key: '_1Kxu0NdU02g_myZiaaVMQ',
	consumer_secret: 'cQJNZiyseTLos6GPESktwOSAbQ0',
	token: 'UoJZd3FQZaPfD-fpfTkYEmZad7IMmJIr',
	token_secret: 'FfGhCbWh-kAOd55qOZhulhgttuY',
});*/

// Global variable
// JSON result of Yelp API
//var jsonResult;

function REST() {
	var self = this;
	self.configure();
}


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + '/public'));
});
/*
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
});*/

REST.prototype.configure = function() {
	var self = this;
	var router = express.Router();
	app.use('/yelp', router);
	var rest_router = new api(router);
	self.startServer();
};

REST.prototype.startServer = function() {
	app.listen(port, function () {
		console.log("Express app listening at http://localhost:" + port + "/");
	});
};
/*
app.listen(port, function () {
	console.log("Express app listening at http://" + hostname + ":" + port + "/");
});*/

new REST();