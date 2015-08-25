/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi   	= require('joi');
var filter 	= require('../../util/filters');
var Estates = require('../../config/tables').estates;

function  getEstates(req, reply) {
	var filterQuery = filter(Estates, req);

	function getWithFilter() {
		filterQuery.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	function get() {
		Estates
			.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	(filterQuery) ? getWithFilter() : get();
}

module.exports = {
	method: 'GET',
	path: '/estates',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number(),
				fields: Joi.string(),
				bedrooms: Joi.number(),
				price: Joi.number(),
				bathrooms: Joi.number(),
				neighborhood: Joi.string(),
			},
		},
	},
};
