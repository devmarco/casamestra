/* ------------------------------------ *\
	[USERS] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Users 	= require('../../config/tables').users;

function getUsers(req, reply) {
	Users
		.without('password')
		.run()
		.then(function then(result) {
			reply(result);
		}).error(() => reply(Boom.badRequest('Try again some time')));
}

module.exports = {
	method: 'GET',
	path: '/users',
	handler: getUsers,
};
