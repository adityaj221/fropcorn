var errorLogs = require("../models/errorLogs");
var request = require('request');


var parseController = function(){

	var options = {
		headers: {
			'X-Parse-Application-Id': 'gXpRgRWOKXdZ90UKmvgA9usMLdOKNyWX8mm1uW5f',
			'X-Parse-REST-API-Key': 'CMmaslQgkGtVZ50u6xAIvCYAiHPYFI4YtPoTag6y',
			'Content-Type': 'application/json'
		}
	};

	var getURL = function(data_id){
		return 'https://api.parse.com/1/classes/errorLogs?where={"data_id" : "'+ data_id + '"}';
	}

	var PostURL = 'https://api.parse.com/1/classes/errorLogs';

	var uploadToParse = function(args, callback){
		args.forEach(function(entry){
			var insert_data = entry.toObject();
			var data_id = insert_data._id;
			delete insert_data._id;
			
			options.url = getURL(data_id);
			
			request.get(options, function(error, response, body){
				getCallback(error, response, data_id, callback, insert_data);			
			});
		});
		contentCallback(null, {"success":"true"}, callback);
	};

	var getCallback = function(error, response, data_id, callback, insert_data){
		if(!error && response.length === undefined){					
			insert_data.data_id = data_id;

			options.url = PostURL;
			options.json = insert_data;
			
			request.post(options, function (error, response, body) {
				postCallback(error, callback, data_id);
			});	
		}
	}
	
	var postCallback = function(error, callback, data_id){
		if (!error) {
			console.log(data_id);
			errorLogs.remove({'_id' : data_id}, function(err, data){
				return;
			});
		}
		else{
			callback(error);
		}
	}

	var get = function(query, cb){
    	errorLogs.find(query, function(err, content){
			contentCallback(err, content, cb);
        })
    };

	var getApi = function(req, res, next){
		var query = prepareQuery(req);

		get(query, function(err, content){
			if(err){
				res.status(500).send('Error in Database Connection: ' + err.stack);
			}else{
				uploadToParseHelper(content, res, next);
			}
		});
	};

	var prepareQuery = function(req){
		var query = {};

		if(req.query){
            var queryKeys = Object.keys(req.query);
            queryKeys.forEach(function(element){
                query[element] = req.query[element];
            });
        }

        return query;
	}

	var contentCallback  = function(err, content, callback){
        if(err){
            callback(err);
        }else{
            callback(null, content);
        }
    }

    var APIcallback = function(err, content, res, next){
		if(err){
			res.status(500).send('Error in Database Connection: ' + err.stack).end();
		}else{
			res.status(200).send(content).end();
			return next();
		}
	}

	var uploadToParseHelper = function(content, res, next){
		if(content.length){
			uploadToParse(content, function(err, insertedData){
		        APIcallback(err, insertedData, res, next);
	    	});
	    }
	    else{
	    	res.status(304).send().end();
	    }
	};

    return{
    	get: getApi,
    }
}

module.exports = parseController;