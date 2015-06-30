/*------------------------------------*\
	[USERS] GET ONE
\*------------------------------------*/

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/users/{ucmid}',
	handler: getUser
}

function getUser(req, reply) {
	
	Users
		.get(req.params.ucmid)
		.without('password')
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;