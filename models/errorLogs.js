var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errorSchema = new Schema({
	Error	: {
		type		: String,
		null 		: false
	}
});

module.exports = mongoose.model('errorLogs', errorSchema);