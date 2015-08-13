/* ------------------------------------ *\
	[NEIGHBORHOODS] GET
\* ------------------------------------ */

var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

function getNeighborhoods(req, reply) {
	Neighborhoods
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/neighborhoods',
	handler: getNeighborhoods,
};
