/* ------------------------------------ *\
	[AGENTS] DELETE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Agents 	= require('../../config/tables').agents;

const removeAgent = (req, reply) => {
	Agents
		.get(req.params.acmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(result => {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this agent not exist'));
			} else {
				reply({
					message: 'The agent was deleted',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: 'DELETE',
	path: '/agents/{acmid}',
	handler: removeAgent,
};
