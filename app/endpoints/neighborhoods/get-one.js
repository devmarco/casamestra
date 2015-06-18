var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

/*------------------------------------*\
	[NEIGHBORHOODS] GET ONE
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/neighborhoods/{NCMID}',
	handler: getNeighborhood
}

/*
 * Get a neighborhood
 */
function getNeighborhood(req, reply) {
	Neighborhoods
		.get(req.params.NCMID)
		.run()
		.then(function(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this neighborhood not exist'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;