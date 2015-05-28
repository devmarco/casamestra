var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var getFavoritedEstates = {
	method: 'GET',
	path: '/favorites',
	handler: function(req, reply) {
		r.table('estates')
			.filter(function(estates) {
				return estates('favorites').count().ne(0);
			})
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}
}

module.exports = getFavoritedEstates;