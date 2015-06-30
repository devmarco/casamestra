/*------------------------------------*\
	[NEIGHBORHOODS] GET ONE
\*------------------------------------*/

var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

var handleGet = {
	method: 'GET',
	path: '/neighborhoods/{ncmid}',
	handler: getNeighborhood
}

function getNeighborhood(req, reply) {
	
	Neighborhoods
		.get(req.params.ncmid)
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