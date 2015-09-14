var mongoose = require("mongoose");
var errorLogs = require('../models/errorLogs');


function logErrors(err, req, res, next) {
  	var errorLog = new errorLogs({Error: err.stack.toString()});
  	var insert_data = errorLog.toObject();
  	delete insert_data._id

  	errorLogs.update({_id: errorLog._id}, insert_data, {upsert: true}, function(err, createdContent){
		if(err){
			req.status(500).send('Error in Database Connection: ' + err.stack);
		}
	});
  	next(err);
}

function errorHandler(err, req, res, next) {
  	res.status(500).send("Error Encountered:  " + err.stack);
}


module.exports ={
    error : errorHandler,
    log : logErrors
}