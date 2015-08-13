/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

function getAgent(req, reply) {
	Agents
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/agents',
	handler: getAgent,
};
