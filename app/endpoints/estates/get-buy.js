/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Async   = require('async');
var Joi   	= require('joi');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/buy',
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

	var filterQuery = filter('estates', req, {
		action: 'buy'
	});

	(filterQuery) ? getBuyWithFilter() : getBuy();

	function getBuyWithFilter() {

		filterQuery
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	};

	function getBuy() {

		Estates
			.filter({
				action: 'sell'
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