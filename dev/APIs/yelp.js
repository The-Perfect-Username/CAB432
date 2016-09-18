// Require the Yelp API module
var Yelp = require('yelp');

// Authorises use of the Yelp API
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

// Handles the request to the Yelp API
// Returns JSON data if successful
function queryHandler(res, params) {
	yelp.search(params)
	.then(function (data) {
		res.send(data.businesses); // Returns Data specific to Businesses
	})
	.catch(function (err) {
		res.send(err);
	});
	
}

REST_ROUTER.prototype.handleRoutes = function(router) {

	router.get("/bycoord/:term/:ll", function(req, res){
		var term   = req.params.term; // Search term
		var ll     = req.params.ll; // Lat and Lon coordinates
		// Set parameters
		var params = {"term": term, "ll": ll};
		queryHandler(res, params);
	});

	// Searches for business' with a specific search term at a 
	// certain location and sorts the data by Best, Distance, or
	// Rating
	router.get("/bycoord/:term/:ll/:sort", function(req, res){
		var term   = req.params.term; // Search term
		var ll     = req.params.ll;   // Lat and Lon coordinates
		var sort   = req.params.sort; // Sort value
		// Set parameters
		var params = {"term": term, "ll": ll, "sort": sort};
		queryHandler(res, params);
	});
};

module.exports = REST_ROUTER;