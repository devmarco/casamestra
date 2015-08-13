/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

function getFavorites(req, reply) {
	Users
		.filter(function filter(users) {
			return users('favorites').contains(function contains(favorite) {
				return favorite('ecmid').eq(req.params.ecmid);
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
	path: '/favorites/users/{ecmid}',
	handler: getFavorites,
};
