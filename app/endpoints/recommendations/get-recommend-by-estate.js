/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Users 	= require('../../config/tables').users;
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/recommend/users/{ecmid}',
	handler: getRecommendations
}

function getRecommendations(req, reply) {
	
	Users
		.innerJoin(Estates, function(usersRow, estatesRow) {
			return usersRow('recommendations').filter(function(recommendations) {
				return recommendations('ecmid').eq(estatesRow('ecmid'));
			});
		})
		.run()
		.then(function(result) {
			reply(result);
		});

	// Users
	// 	.get(req.params.ucmid)
	// 	.run()
	// 	.then(function(result) {
	// 		if (result.recommendations && result.recommendations.length) {
	// 			reply(result.recommendations);
	// 		} else {
	// 			reply(Boom.badRequest('Sorry, This user not have recommendations'));
	// 		}
	// 	}).error(function(err) {
	// 		reply(Boom.badRequest('Sorry, Something are wrong!'));
	// 	});
}

module.exports = handleGet;