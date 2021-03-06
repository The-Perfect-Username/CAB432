var express = require('express');
var app = express();
var yelpApi = require("./APIs/yelp.js");
var uberApi = require("./APIs/uber.js");
var Yelp = require('yelp');


const hostname = "localhost";
const port = 3000;


function REST() {
	var self = this;
	self.configure();
}

// Routes to the main application
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + '/public'));
});

// Configure routing
REST.prototype.configure = function() {
	var self = this;
	var router = express.Router();
	app.use('/yelp', router);
	app.use('/uber', router);
	var yelp_router = new yelpApi(router); // Yelp API routes
	var uber_router = new uberApi(router); // Uber API routes
	self.startServer();
};

// Starts the server
REST.prototype.startServer = function() {
	app.listen(port, function () {
		console.log("Express app listening at http://" + hostname + ":" + port + "/");
	});
};

new REST();
