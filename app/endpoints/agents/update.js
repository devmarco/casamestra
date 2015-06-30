/*------------------------------------*\
	[AGENTS] CREATE
\*------------------------------------*/

var Boom    = require('boom');
var Joi     = require('joi');
var Agents 	= require('../../config/tables').agents;
var Schema 	= require('../../models/agent');

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/agents/{acmid}',
	handler: updateAgent,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: Schema
		}
	}
}

function updateAgent(req, reply) {
	
	Agents
		.get(req.params.acmid)
		.update(req.payload)
		.run()
		.then(function(result) {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The agent was updated'
				});
			}
			
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleUpdate;