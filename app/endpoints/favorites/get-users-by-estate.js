var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var getFavoritedUsers = {
	method: 'GET',
	path: '/estates/{ESTATECMID}/favorites/users',
	handler: function(req, reply) {
		r.table('estates')('favorites')
			.filter(function(users) {
				return users.filter(function(user) {
					return user('cmid').eq(req.params.USERCMID);
				});
			})
			.run()
			.then(function(result) {
				reply(result);
			})
			.error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getFavoritedUsers;