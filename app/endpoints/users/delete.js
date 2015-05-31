var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[USERS] DELETE
\*------------------------------------*/

var deleteUsers = {
	method: 'DELETE',
	path: '/users/{UCMID}',
	handler: function(req, reply) {
		r.table('users')
			.get(req.params.UCMID)
			.delete({
				returnChanges: true
			})
			.run()
			.then(function(result) {
				if (result.deleted === 0) {
					reply(Boom.notFound('Sorry, this user not exist'));
				} else {
					reply({
						message: 'The user was deleted'
					});
				}
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	}
}

module.exports = deleteUsers;