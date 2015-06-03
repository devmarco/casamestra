var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var getFavoritedEstates = {
	method: 'GET',
	path: '/favorites/{UCMID}',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ESTATES]
		 */
		T_ESTATES = r.table('estates');

		get();

		function get() {
			T_ESTATES
				.filter( function(estates) {
					return estates('favorites').contains(function(favorites) {
						return favorites('UCMID').eq(req.params.UCMID);
					})
				})
				.run()
				.then(function(result) {
					if (result.length !== 0) {
						reply(result);
					} else {
						reply(Boom.badRequest('Sorry, This user not have favorites'));
					}
				}).error(function(err) {
					reply(Boom.badRequest('Sorry, Something are wrong!'));
				});
		}
	}
}

module.exports = getFavoritedEstates;