/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/recommend/estates/{ucmid}',
	handler: getRecommendations
}

function getRecommendations(req, reply) {
	
	Users
		.get(req.params.ucmid)('suggestions')
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