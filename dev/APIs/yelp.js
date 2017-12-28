'use strict';

const Yelp = require('yelp-fusion');

// Authorises use of the Yelp API
var yelp = Yelp.client('ilMklTiesLyYDYOaA5hklKs4CQRw0OvxzQM1bib6f7NYOGVNi1AyrAgDu_6esuxtbPh8_bhWraa2I06K0QELDQ3_O4TPjK4jP6navRGs0ndBHMZslx7ptCgZVkREWnYx');


function REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

// Handles the request to the Yelp API
// Returns JSON data if successful
function queryHandler(res, params) {
	yelp.search(params)
	.then(function (data) {
		console.log(data.jsonBody.businesses);
		res.send(data.jsonBody.businesses); // Returns Data specific to Businesses
	})
	.catch(function (err) {
		res.send(err);
	});

}

REST_ROUTER.prototype.handleRoutes = function(router) {

	router.get("/bycoord/:term/:ll", function(req, res){
		var term   = req.params.term; // Search term
		var lat    = req.params.ll.split(',')[0]; // Lat and Lon coordinates
		var lon    = req.params.ll.split(',')[1]; // Lat and Lon coordinates
		// Set parameters
		var params = {"term": term, "latitude": lat, "longitude": lon};
		queryHandler(res, params);
	});

	// Searches for business' with a specific search term at a
	// certain location and sorts the data by Best, Distance, or
	// Rating
	router.get("/bycoord/:term/:ll/:sort", function(req, res){
		var term   = req.params.term; // Search term
		var lat    = req.params.ll.split(',')[0]; // Lat and Lon coordinates
		var lon    = req.params.ll.split(',')[1]; // Lat and Lon coordinates
		var sort   = req.params.sort; // Sort value
		// Set parameters
		var params = {"term": term, "latitude": lat, "longitude": lon, "sort_by": sort};
		queryHandler(res, params);
	});
};

module.exports = REST_ROUTER;
