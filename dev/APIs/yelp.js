var Yelp = require('yelp');

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

var jsonResult;


function queryHandler(res, err, params) {
	yelp.search(params)
	.then(function (data) {
		jsonResult = data;
	})
	.catch(function (err) {
		jsonResult = err;
	});

	res.json(jsonResult);

}

REST_ROUTER.prototype.handleRoutes = function(router) {
	var self = this;
	router.get("/", function(request, response){
		response.json({"message": "Hello World!"});
	});

	router.get("/bylocation/:term/:location", function(req, res){
		var term     = req.params.term;
		var location = req.params.location;
		var params   = {"term": a, "location": b};
		queryHandler(res, null, params);
	});

	router.get("/bycoord/:term/:ll", function(req, res){
		var term   = req.params.term;
		var ll     = req.params.ll;
		var params = {"term": term, "ll": ll};
		queryHandler(res, null, params);
	});
};

module.exports = REST_ROUTER;