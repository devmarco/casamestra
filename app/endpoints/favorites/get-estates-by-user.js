var Boom 	= require('boom');
var Estates = require('../../config/tables').agents;

/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/favorites/{UCMID}',
	handler: getFavorites
}

/*
 * Get all favorites of a specific user
 */
function getFavorites(req, reply) {
	Estates
		.filter( function(estates) {
			return estates('favorites').contains(function(favorites) {
				return favorites('UCMID').eq(req.params.UCMID);
			})
		})
		.run()
		.then(function(result) {
			if (result.length !== 0) {
				reply(result);
			} else {
				reply(Boom.badRequest('Sorry, This user not have favorites'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = handleGet;