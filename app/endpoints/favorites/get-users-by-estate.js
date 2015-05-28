var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var getFavoritedUsers = {
	method: 'GET',
	path: '/favorites/users/{ECMID}',
	handler: function(req, reply) {
		r.table('estates')
			.get(req.params.ECMID)
			.run()
			.then(function(result) {
				if (result) {
					reply(result.favorites);
				} else {
					reply(Boom.badRequest('Sorry, This user not have favorites'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}
}

module.exports = getFavoritedUsers;