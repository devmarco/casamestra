/* ------------------------------------ *\
	[USERS] GET ONE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Users 	= require('../../config/tables').users;

function getUser(req, reply) {
	Users
		.get(req.params.ucmid)
		.without('password')
		.run()
		.then(function then(result) {
			reply(result);
		}).error(() => reply(Boom.badRequest('Try again some time')));
}

module.exports = {
	method: 'GET',
	path: '/users/{ucmid}',
	handler: getUser,
};
