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
	yelp.search(params)
	.then(function (data) {
		res.send(data.businesses);
	})
	.catch(function (err) {
		res.send(err);
	});
	
}

REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	router.get("/bylocation/:start/:end", function(req, res){
		var term     = req.params.term;
		var location = req.params.location;
		var params   = {"term": term, "location": location};
		queryHandler(res, params);
	});

};

module.exports = REST_ROUTER;