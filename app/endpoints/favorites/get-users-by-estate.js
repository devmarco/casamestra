/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

var getFavoritedUsers = {
	method: 'GET',
	path: '/favorites/users/{ecmid}',
	handler: getFavorites
}

function getFavorites(req, reply) {
	
	Users
		.filter(function(users) {
			return users('favorites').contains(function(favorite) {
				return favorite('ecmid').eq(req.params.ecmid);
			});
		})
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = getFavoritedUsers;