var Content = require("../models/content");


var contentController = function(){

	var add = function(args, callback){
		var content  = new Content(args);
		var insert_data = content.toObject();
		delete insert_data._id;
		Content.update({_id: content._id}, insert_data, {upsert: true}, function(err, createdContent){
			contentCallback(err, {"success":"true"}, callback);
		});
	};

	var addApi = function(req, res, next){
		add(req.body, function(err, content){
			APIcallback(err, content, res, next);
		});
	};

	var get = function(query, cb){
        Content.find(query, function(err, createdContent){
			contentCallback(err, createdContent, cb);
		});
    };

	var getApi = function(req, res, next){
		var query = prepareQuery(req);
		get(query, function(err, content){
			APIcallback(err, content, res, next);
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
    return{
    	add: addApi,
    	get: getApi,
    }
}

module.exports = contentController;