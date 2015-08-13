/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;
var Estates = require('../../config/tables').estates;

function getRecommendations(req, reply) {
	Users
		.get(req.params.ucmid)('suggestions')
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
	path: '/recommend/estates/{ucmid}',
	handler: getRecommendations,
};
