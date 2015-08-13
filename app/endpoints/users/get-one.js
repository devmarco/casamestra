/* ------------------------------------ *\
	[USERS] GET ONE
\* ------------------------------------ */

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;

function getUser(req, reply) {
	Users
		.get(req.params.ucmid)
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
	path: '/users/{ucmid}',
	handler: getUser,
};
