/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Estates = require('../../config/tables').agents;

var getFavoritedUsers = {
	method: 'GET',
	path: '/favorites/users/{ECMID}',
	handler: getFavorites
}

/*
 * Get all users that has favorited a specific estate
 */
function getFavorites(req, reply) {
	Estates
		.get(req.params.ECMID)
		.run()
		.then(function(result) {
			if (result) {
				reply(result.favorites);
			} else {
				reply(Boom.badRequest('Sorry, This estate not have favorites'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = getFavoritedUsers;