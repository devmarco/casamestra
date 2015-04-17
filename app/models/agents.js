var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agentSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	phone: {
		office: String,
		cellphone: String
	},
	description: String,
	experience: Array,
	expertise: Array,
	creci: Number
});

var agents = mongoose.model('agents', agentSchema);

module.exports = agents;