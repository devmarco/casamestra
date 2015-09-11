/* ------------------------------------ *\
	[USERS] DELETE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Users 	= require('../../config/tables').users;

function removeUser(req, reply) {
	Users
		.get(req.params.ucmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(function then(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this user not exist'));
			} else {
				reply({
					status: 'success',
					message: 'The user was deleted',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
}

module.exports = {
	method: 'DELETE',
	path: '/users/{ucmid}',
	handler: removeUser,
};
