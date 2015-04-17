var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neighborhoodsSchema = new Schema({
	city: String,
    name: String,
    title: String,
    description: String,
    cover: String,
    tags: Array,
    about: {
    	neighbors: String,
    	expect: String,
    	lifestyle: String,
    	notexpect: String,
    	market: String,
    	love: String
    },
    address: {
    	local: String,
    	lat: Number,
    	lng: Number
    },
    commutetimes: [{
    	destination: String,
    	time: Number
    }]
});

var neighborhoods = mongoose.model('neighborhoods', neighborhoodsSchema);

module.exports = neighborhoods;
