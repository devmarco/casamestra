/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Joi   	= require('joi');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number(),
				fields: Joi.string()
			}
		}
	}
}

function  getEstates(req, reply) {

	var filterQuery = filter(Estates, req, {
		action: 'rent'
	});

	(filterQuery) ? getWithFilter() : get();

	function getWithFilter() {

		filterQuery.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	};

	function get() {
		
		Estates
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	};
}

module.exports = handleGet;