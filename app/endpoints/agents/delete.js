var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

/*------------------------------------*\
	[AGENTS] DELETE
\*------------------------------------*/

var handleDelete = {
	method: 'DELETE',
	path: '/agents/{CRECI}',
	handler: deleteAgent
}

/*
 * Delete the Agent
 */
function deleteAgent(req, reply) {
	Agents
		.get(parseInt(req.params.CRECI))
		.delete({
			returnChanges: true
		})
		.run()
		.then(function(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this agent not exist'));
			} else {
				reply({
					message: 'The agent was deleted'
				});
			}
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleDelete;