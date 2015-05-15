var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var filter 	= require('../../filters/limit-offset');

/*------------------------------------*\
	[ESTATE] GET
\*------------------------------------*/

var getEstates = {
	method: 'GET',
	path: '/estates/rent',
	handler: function(req, reply) {

		//Check if user want a filtered result
		var resultFilter = filter('estates', req, {
			action: 'rent'
		});

		if (resultFilter) {
			resultFilter
				.run()
				.then(function(result) {
					reply(result);
				}).error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		} else {
			r.table('estates')
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
}

module.exports = getEstates;