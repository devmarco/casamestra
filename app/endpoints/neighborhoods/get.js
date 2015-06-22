/*------------------------------------*\
	[NEIGHBORHOODS] GET
\*------------------------------------*/

var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

var handleGet = {
	method: 'GET',
	path: '/neighborhoods',
	handler: getNeighborhoods
}

/*
 * Get all neighborhoods
 */
function getNeighborhoods(req, reply) {
	Neighborhoods
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;