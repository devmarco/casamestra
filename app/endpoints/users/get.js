var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

/*------------------------------------*\
	[USERS] GET
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/users',
	handler: getUsers
}

/*
 * Get all users
 */
function getUsers(req, reply) {
	Users
		.without('password')
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;