var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	movieName	: {
		type		: String,
		null 		: false
	}
});

module.exports = mongoose.model('Content', contentSchema);