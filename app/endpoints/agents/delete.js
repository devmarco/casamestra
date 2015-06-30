/*------------------------------------*\
	[AGENTS] DELETE
\*------------------------------------*/

var Boom 	= require('boom');
var Agents 	= require('../../config/tables').agents;

var handleDelete = {
	method: 'DELETE',
	path: '/agents/{acmid}',
	handler: deleteAgent
}

function deleteAgent(req, reply) {
	
	Agents
		.get(req.params.acmid)
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