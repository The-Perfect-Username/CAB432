// Require the Uber API
var Uber = require('node-uber');
// Authorises use of the Uber API
var uber = new Uber({
	client_id: 'ANFBZUeCN5uuK6ZF_TWDJKL1zAxQb2aW',
	client_secret: '_TqWY_N2pat7JH9y_dHKNVMZlsSPG3C68ukUrqsH',
	server_token: '_inarMZORSfhRO_abrG2ebtstfyNjpOVOjJ2lHWT',
	redirect_uri: 'http://localhost:3000',
	name: 'TRAVELAPP CAB432',
	language: 'en_US', // optional, defaults to en_US
	sandbox: true // optional, defaults to false
});


function REST_ROUTER(router) {
	var self = this;
	self.handleRoutes(router);
}

// Handles the request to the Uber API
// Returns JSON data if successful
function queryHandler(res, params) {
	// Gets the Price and Travel estimates of an Uber
	uber.estimates.getPriceForRoute(params.start_lat, params.start_lon, params.end_lat, params.end_lon, function (err, data) {
 		if (err) {
 			res.send(err); // Sends Error
 		} else {
 			res.send(data); // Sends Results
 		}
	});
	
}

REST_ROUTER.prototype.handleRoutes = function(router) {

	router.get("/fare/:start/:end", function(req, res){	
		// Client and Business Coordinates
		var start  = req.params.start;
		var end    = req.params.end;
		// Converts strings to arrays containing the Lat and Lon cooridinates
		var start_coords = start.split(",");
		var end_coords   = end.split(",");
		// Client coordinates
		var start_lat = start_coords[0];
		var start_lon = start_coords[1];
		// Business' Coordinates
		var end_lat = end_coords[0];
		var end_lon = end_coords[1];
		// Set parameters
		var params = {"start_lat": start_lat, "start_lon": start_lon, "end_lat": end_lat, "end_lon": end_lon};
		queryHandler(res, params);
	});

};

module.exports = REST_ROUTER;