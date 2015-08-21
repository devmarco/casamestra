/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi   	= require('joi');
var filter 	= require('../../filters/filters');
var Estates = require('../../config/tables').estates;

function getEstates(req, reply) {
	var filterQuery = filter(Estates, req, {
		action: 'sell',
	});

	function getBuyWithFilter() {
		filterQuery
			.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	function getBuy() {
		Estates
			.filter({
				action: 'sell',
			})
			.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	(filterQuery) ? getBuyWithFilter() : getBuy();
}

module.exports = {
	method: 'GET',
	path: '/estates/buy',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number(),
				fields: Joi.string(),
			},
		},
	},
};
