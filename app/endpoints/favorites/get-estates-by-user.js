/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/favorites/estates/{ucmid}',
	handler: getFavorites
}

function getFavorites(req, reply) {
	
	Users
		.get(req.params.ucmid)('favorites')
		.innerJoin(Estates, function(userRow, estatesRow) {
			return estatesRow('ecmid').eq(userRow('ecmid'));
		})
		.zip()
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = handleGet;