var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	phone: {
		cellphone: String,
		home: String
	},
	password: String
});

var users = mongoose.model('users', usersSchema);

module.exports = users;