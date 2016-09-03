var Yelp = require('yelp');

var yelp = new Yelp({
	consumer_key: '_1Kxu0NdU02g_myZiaaVMQ',
	consumer_secret: 'cQJNZiyseTLos6GPESktwOSAbQ0',
	token: 'UoJZd3FQZaPfD-fpfTkYEmZad7IMmJIr',
	token_secret: 'FfGhCbWh-kAOd55qOZhulhgttuY',
});


function YELP_ROUTER(router, connection) {
	var self = this;
	self.handleRoutes(router, connection);
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

YELP_ROUTER.prototype.handleRoutes = function(router, connection) {
	var self = this;
	router.get("/", function(request, response){
		response.json({"message": "Hello World!"});
	});

	router.get("bylocation/:term/:location", function(req, res){
		var a = req.params.term;
		var b = req.params.location;
		var params = {a, b};
		queryHandler(res, null, params);
	});

	router.get("bycoord/:term/:ll", function(req, res){
		var a = req.params.term;
		var b = req.params.ll;
		var params = {a, b};
		queryHandler(res, null, params);
	});
};

module.exports = YELP_ROUTER;