/*------------------------------------ *\
	[AGENTS] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Agents 	= require('../../config/tables').agents;
var Schema 	= require('../../models/agent');

var handleCreate = {
	method: 'POST',
	path: '/agents',
	handler: createAgent,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required'
			},
			payload: Schema
		}
	}
}	

function createAgent(req, reply) {
	
	Agents
		.insert(req.payload, {
			conflict: 'error'
		})
		.run()
		.then(function(result) {
			if (result.errors !== 0) {
				reply(Boom.conflict('Probably this agent already exist'));
			} else {
				reply(req.payload);
			}
			
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleCreate;