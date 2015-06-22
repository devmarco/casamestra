/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var Boom 	= require('boom');
var filter 	= require('../../filters/limit-offset');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/rent',
	handler: getEstates
}

/*
 * Get the estate for rent
 */
function getEstates(req, reply) {
	var filterQuery = filter('estates', req, {
		action: 'rent'
	});

	if (filterQuery) {
		filterQuery
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	} else {
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
	}
}

module.exports = handleGet;