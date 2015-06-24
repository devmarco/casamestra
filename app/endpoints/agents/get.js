/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

var handleGet = {
	method: 'GET',
	path: '/agents',
	handler: getAgent
}

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