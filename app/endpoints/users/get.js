/* ------------------------------------ *\
	[USERS] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

function getUsers(req, reply) {
	Users
		.without('password')
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/users',
	handler: getUsers,
};
