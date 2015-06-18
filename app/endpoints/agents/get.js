var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/agents',
	handler: getAgent
}

/*
 * Get all Agents
 */
function getAgent(req, reply) {
	Agents
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;