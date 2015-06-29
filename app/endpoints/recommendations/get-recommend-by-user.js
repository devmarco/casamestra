/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Users = require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/estates/recommend/{UCMID}',
	handler: getRecommendations
}

function getRecommendations(req, reply) {
	
	Users
		.get(req.params.UCMID)
		.run()
		.then(function(result) {
			if (result && result.recommendations && result.recommendations.length) {
				reply(result.recommendations);
			} else {
				reply(Boom.badRequest('Sorry, This user not have recommendations'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = handleGet;