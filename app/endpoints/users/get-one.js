var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[USERS] GET ONE
\*------------------------------------*/

var getOneUser = {
	method: 'GET',
	path: '/users/{CMID}',
	handler: function(req, reply) {
		r.table('users')
			.get(parseInt(req.params.CMID))
			.run()
			.then(function(result) {
				if (result) {
					reply(result);
				} else {
					reply(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getOneUser;