/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/buy',
	handler: getEstates
}

function getEstates(req, reply) {

	var filterQuery = filter('estates', req, {
		action: 'buy'
	});

	(function getBuyWithFilter() {

		if (!filterQuery) return false;

		filterQuery
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}());

	(function getBuy() {

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
	}());
}

module.exports = handleGet;