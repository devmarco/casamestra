/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi   	= require('joi');
var filter 	= require('../../util/filters');
var Estates = require('../../config/tables').estates;

function getEstates(req, reply) {
	var filterQuery = filter(Estates, req, {
		action: 'rent',
	});

	function getRentWithFilter() {
		filterQuery
			.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	function getRent() {
		Estates
			.filter({
				action: 'rent',
			})
			.run()
			.then(function then(result) {
				reply(result);
			}).error(function error(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}

	(filterQuery) ? getRentWithFilter() : getRent();
}

module.exports = {
	method: 'GET',
	path: '/estates/rent',
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
