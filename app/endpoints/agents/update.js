/* ------------------------------------ *\
	[AGENTS] CREATE
\* ------------------------------------ */

'use strict';

const Boom    	= require('boom');
const Agents 	= require('../../config/tables').agents;
const Schema 	= require('../../models/agent');

const updateAgent = (req, reply) => {
	Agents
		.get(req.params.acmid)
		.update(req.payload)
		.run()
		.then(result => {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The agent was updated',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: ['PUT', 'PATCH'],
	path: '/agents/{acmid}',
	handler: updateAgent,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: Schema,
		},
	},
};
