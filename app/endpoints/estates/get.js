/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates',
	handler: getEstates
}

function  getEstates(req, reply) {

	var filterQuery = filter('estates', req);

	(function getWithFilter() {

		if (!filterQuery) return false;

		filterQuery.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}());

	(function get() {
		Estates
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}());
}

module.exports = handleGet;