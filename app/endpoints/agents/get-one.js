var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

/*------------------------------------*\
	[AGENTS] GET ONE
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/agents/{CRECI}',
	handler: getAgent
}

/*
 * Get an Agent
 */
function getAgent(req, reply) {
	Agents
		.get(parseInt(req.params.CRECI))
		.run()
		.then(function(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this agent not exist'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;