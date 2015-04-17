var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estatesSchema = new Schema({
	title: String,
	address: {
		local: String,
		lat: Number,
		lng: Number
	},
	gallery: {
		cover: String,
		photos: Array
	},
	features: Array,
	details: [{
		name: String,
		value: String
	}],
	type: String,
	area: Number,
	bedroom: Number,
	bathroom: Number,
	park: Number,
	price: Number,
	description: String,
	estate_type: String,
	exclusive: Boolean,
	neighborhood: String,
	agent: {
		name: String,
		phone: {
			home: Number,
			cellphone: Number
		},
		email: String
	},
	favorites: {
		users: Array
	},
	featured: Boolean,
	status: String,
	created_at: Date,
	updated_at: Date
});

var estates = mongoose.model('estate', estatesSchema);

module.exports = estates;