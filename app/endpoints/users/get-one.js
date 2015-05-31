var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[USERS] GET ONE
\*------------------------------------*/

var getOneUser = {
	method: 'GET',
	path: '/users/{UCMID}',
	handler: function(req, reply) {
		r.table('users')
			.get(req.params.UCMID)
			.without('password')
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getOneUser;