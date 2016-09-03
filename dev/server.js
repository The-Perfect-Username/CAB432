var express = require('express');
var path = require('path')
var http = require('http');
var app = express();


const hostname = "localhost";
const port = 3000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
    app.use(express.static(__dirname + '/public'));
});

app.listen(port, function () {
	console.log("Express app listening at http://" + hostname + ":" + port + "/");
});