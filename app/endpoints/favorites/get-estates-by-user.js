/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

function getFavorites(req, reply) {
	Users
		.get(req.params.ucmid)('favorites')
		.innerJoin(Estates, function innerJoin(userRow, estatesRow) {
			return estatesRow('ecmid').eq(userRow('ecmid'));
		})
		.zip()
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = {
	method: 'GET',
	path: '/favorites/estates/{ucmid}',
	handler: getFavorites,
};
