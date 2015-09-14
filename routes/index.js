var express = require('express');
var middleware = require('../middleware/');
var contentController = require('../controller/content');
var parseController = require('../controller/parse');

var parser = require("body-parser");

module.exports = function(app){

	app.use(parser());

	app.get('/', function(req, res, next){
		var controller = new contentController();
		controller.get(req, res, next);
	});

	app.post('/content', function(req, res, next){
		if(req.body.movieName === undefined || req.body.movieName === ''){
			var error = new Error("movieName is missing");
			next(error);
		}
		else{
			var controller = new contentController();
			controller.add(req, res, next);
		}
	});

	app.get('/parse',function(req, res, next){
		var controller = new parseController();
		controller.get(req, res, next);
	});

	app.use(middleware.log);
	app.use(middleware.error);
}
