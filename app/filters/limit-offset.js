var DB 		= require('../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

var Filters = function(config) {

	this.table 			= config.table;
	this.customValues 	= {};

	this.filters = {
		pluck: 	config.fields 			|| null,
		skip: 	parseInt(config.offset) || null,
		limit:  parseInt(config.limit) 	|| null
	}

	if (config.options) this.customValues = config.options;
}

Filters.prototype.mount = function(limit, offset) {
	var method,
		value;

	this.query = this.table.filter(this.customValues);

	for (i in this.filters) {

		method 	= i;
		value 	= this.filters[i];

		if (value) {

			if (method === 'pluck') {
				value = value.split(',');
			}
			
			this.query = this.query[method](value);
		}
	}

	return this;
}	

Filters.prototype.getQuery = function(limit, offset) {
	return this.query || false;
}	


function checkFilter(table, req, option) {
	var Filter;

	Filter = new Filters({
		table:  	table,
		options: 	option,
		limit: 		req.query.limit,
		offset: 	req.query.offset,
		fields: 	req.query.fields
	});


	return Filter.mount().getQuery();
}

module.exports = checkFilter;