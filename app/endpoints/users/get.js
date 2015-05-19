var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[USERS] GET
\*------------------------------------*/

var getUsers = {
	method: 'GET',
	path: '/users',
	handler: function(req, reply) {
		r.table('users')
			.without('password')
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getUsers;