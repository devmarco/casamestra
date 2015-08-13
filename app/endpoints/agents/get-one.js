/* ------------------------------------ *\
	[AGENTS] GET ONE
\* ------------------------------------ */

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

function getAgent(req, reply) {
	Agents
		.get(req.params.acmid)
		.run()
		.then(function then(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this agent not exist'));
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/agents/{acmid}',
	handler: getAgent,
};
