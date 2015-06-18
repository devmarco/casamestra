var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

/*------------------------------------*\
	[USERS] GET ONE
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/users/{UCMID}',
	handler: getUser
}

/*
 * Get an User
 */
function getUser(req, reply) {
	Users
		.get(req.params.UCMID)
		.without('password')
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;