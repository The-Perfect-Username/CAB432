// Require the Yelp API module
var Yelp = require('yelp');

// Create new YELP API object
var yelp = new Yelp({
	consumer_key: '_1Kxu0NdU02g_myZiaaVMQ',
	consumer_secret: 'cQJNZiyseTLos6GPESktwOSAbQ0',
	token: 'UoJZd3FQZaPfD-fpfTkYEmZad7IMmJIr',
	token_secret: 'FfGhCbWh-kAOd55qOZhulhgttuY',
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
	router.get("/bylocation/:term/:location", function(req, res){
		var term     = req.params.term;
		var location = req.params.location;
		var params   = {"term": term, "location": location};
		queryHandler(res, params);

		//req.session.location = location;
		//console.log(req.session.location);
	});

	router.get("/bylocation/:term/:location/:sort", function(req, res){
		var term     = req.params.term;
		//var location = req.params.location == "null" ? req.session.location : req.params.location;
		var location = req.params.location;
		var sort     = req.params.sort;
		var params   = {"term": term, "location": location, "sort": sort};
		queryHandler(res, params);

		//req.session.location = location;
		//console.log(req.session.location);
	});

	router.get("/bycoord/:term/:ll", function(req, res){
		var term   = req.params.term;
		var ll     = req.params.ll;
		var params = {"term": term, "ll": ll};
		queryHandler(res, params);

		//req.session.ll = ll;
	});

	router.get("/bycoord/:term/:ll/:sort", function(req, res){
		var term   = req.params.term;
		var ll     = req.params.ll;
		var sort   = req.params.sort;
		var params = {"term": term, "ll": ll, "sort": sort};
		queryHandler(res, params);

		//req.session.ll = ll;
	});
};

module.exports = REST_ROUTER;