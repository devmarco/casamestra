/* ------------------------------------ *\
	[AGENTS] CREATE
\* ------------------------------------ */

var Boom    = require('boom');
var Joi     = require('joi');
var Agents 	= require('../../config/tables').agents;
var Schema 	= require('../../models/agent');

function updateAgent(req, reply) {
	Agents
		.get(req.params.acmid)
		.update(req.payload)
		.run()
		.then(function then(result) {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The agent was updated',
				});
			}

		}).error(function error(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

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
