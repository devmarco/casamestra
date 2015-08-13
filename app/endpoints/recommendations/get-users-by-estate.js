/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Users = require('../../config/tables').users;

function getRecommendations(req, reply) {
	Users
		.filter(function filter(users) {
			return users('suggestions').contains(function contains(suggestion) {
				return suggestion('ecmid').eq(req.params.ecmid);
			});
		})
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = {
	method: 'GET',
	path: '/recommend/users/{ecmid}',
	handler: getRecommendations,
};
