/* ------------------------------------ *\
	[AGENTS] DELETE
\* ------------------------------------ */

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

function deleteAgent(req, reply) {
	Agents
		.get(req.params.acmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(function then(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this agent not exist'));
			} else {
				reply({
					message: 'The agent was deleted',
				});
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = {
	method: 'DELETE',
	path: '/agents/{acmid}',
	handler: deleteAgent,
};
