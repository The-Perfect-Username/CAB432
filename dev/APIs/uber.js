var Uber = require('node-uber');

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


function queryHandler(res, params) {
	uber.estimates.getPriceForRoute(params.start_lat, params.start_lon, params.end_lat, params.end_lon, function (err, data) {
 		if (err) {
 			res.send(err);
 		} else {
 			res.send(data);
 		}
	});
	
}

REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	router.get("/fare/:start/:end", function(req, res){
		
		var start  = req.params.start;
		var end    = req.params.end;

		var start_coords = start.split(",");
		var end_coords   = end.split(",");

		var start_lat = start_coords[0];
		var start_lon = start_coords[1];

		var end_lat = end_coords[0];
		var end_lon = end_coords[1];

		var params = {"start_lat": start_lat, "start_lon": start_lon, "end_lat": end_lat, "end_lon": end_lon};
		queryHandler(res, params);
	});

};

module.exports = REST_ROUTER;