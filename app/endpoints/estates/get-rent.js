/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Joi   	= require('joi');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/rent',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number()
			}
		}
	}
}

function getEstates(req, reply) {

	var filterQuery = filter(Estates, req, {
		action: 'rent'
	});

	(filterQuery) ? getRentWithFilter() : getRent();

	function getRentWithFilter() {

		filterQuery
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	};

	function getRent() {

		Estates
			.filter({
				action: 'rent'
			})
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	};
}

module.exports = handleGet;