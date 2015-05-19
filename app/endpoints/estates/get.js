var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var filter 	= require('../../filters/limit-offset');

/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var getEstates = {
	method: 'GET',
	path: '/estates',
	handler: function(req, reply) {

		var resultFilter = filter('estates', req);

		if (resultFilter) {
			resultFilter.run()
				.without('favorites')
				.then(function(result) {
					reply(result);
				}).error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		} else {
			r.table('estates')
				.without('favorites')
				.run()
				.then(function(result) {
					reply(result);
				}).error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		}
	}
}

module.exports = getEstates;