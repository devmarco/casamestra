/*------------------------------------*\
	[AGENTS] GET ONE
\*------------------------------------*/

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

var handleGet = {
	method: 'GET',
	path: '/agents/{ACMID}',
	handler: getAgent
}

function getAgent(req, reply) {
	
	Agents
		.get(req.params.ACMID)
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