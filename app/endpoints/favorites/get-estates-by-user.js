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

		r.table('users')
			.get(req.params.UCMID)
			.run()
			.then(function(result) {
				if (result.length !== 0) {
					r.table('estates')
						.filter(function(estates) {
							return estates('favorites').contains(req.params.UCMID);
						})
						.run()
						.then(function(result) {
							reply(result);
						})
						.error(function(err) {
							reply(Boom.badRequest('Try again some time'));
						});
					} else {
						reply(Boom.badRequest('Sorry, This user not exist'));
					}
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}
}

module.exports = getFavoritedEstates;