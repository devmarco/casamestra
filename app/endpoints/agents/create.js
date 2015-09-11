/* ------------------------------------ *\
	[AGENTS] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Agents 	= require('../../config/tables').agents;
const Schema 	= require('../../models/agent');

const createAgent = (req, reply) => {
	Agents
		.insert(req.payload, {
			conflict: 'error',
		})
		.run()
		.then(result => {
			if (result.errors !== 0) {
				reply(Boom.conflict('Probably this agent already exist'));
			} else {
				reply(req.payload);
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: 'POST',
	path: '/agents',
	handler: createAgent,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required',
			},
			payload: Schema,
		},
	},
};
