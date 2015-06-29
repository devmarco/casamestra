/*------------------------------------*\
	[USERS] DELETE
\*------------------------------------*/

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

var handleDelete = {
	method: 'DELETE',
	path: '/users/{UCMID}',
	handler: removeUser
}

function removeUser(req, reply) {
	
	Users
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
					status: 'success',
					message: 'The user was deleted'
				});
			}
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleDelete;