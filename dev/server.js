var express = require('express');
var path = require('path')
var http = require('http');
var app = express();
var bodyParser = require("body-parser");
var api = require("./APIs/yelp.js");
var Yelp = require('yelp');
var session = require('express-session');


const hostname = "localhost";
const port = 3000;


function REST() {
	var self = this;
	self.configure();
}


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + '/public'));
});


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

new REST();