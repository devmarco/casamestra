/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Users = require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/recommend/users/{ecmid}',
	handler: getRecommendations
}

function getRecommendations(req, reply) {
	
	Users
		.filter(function(users) {
			return users('suggestions').contains(function(suggestion) {
				return suggestion('ecmid').eq(req.params.ecmid);
			});
		})
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = handleGet;