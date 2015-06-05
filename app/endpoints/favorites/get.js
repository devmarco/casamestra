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

		/*
		 * Set the table
		 * Table: [ESTATES]
		 */
		var T_ESTATES = r.table('estates');

		get();

		function get() {
			T_ESTATES
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
}

module.exports = getFavoritedEstates;