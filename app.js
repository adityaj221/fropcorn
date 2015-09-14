var express = require("express");
var mongoose = require("mongoose");
var Content = require('./models/content');
var errorLogs = require('./models/errorLogs');
var parseController = require('./controller/parse');
var request = require('request');

var app = express();

mongoose.connect('mongodb://localhost/fropcorn');

require('./routes/')(app);

app.listen(1337, function(){
	console.log("Ready on port 1337");
});

// Cron Job to trigger the upload script very 10 min.
var CronJob = require('cron').CronJob;
var job = new CronJob({
  	cronTime: '* 10 * * * *',
  	onTick: function() {
	    request.get("http://127.0.0.1:1337/parse", function(){
	    	return;
	    });
  	},
  	start: false,
  	timeZone: 'America/Los_Angeles'
});
job.start();