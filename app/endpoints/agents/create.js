/*------------------------------------ *\
	[AGENTS] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Agents 	= require('../../config/tables').agents;

var handleCreate = {
	method: 'POST',
	path: '/agents',
	handler: createAgent,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().email().required(),
				phones: Joi.object({
					cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required(),
					homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required()
				}),
				description: Joi.string().required(),
				about: Joi.object({
					academic: Joi.array().items(Joi.string()),
					professional: Joi.array().items(Joi.string()),
					expertise: Joi.array().items(Joi.string()).required(),
					languages: Joi.array().items(Joi.string()).required()
				}),
				creci: Joi.number().required()
			}
		}
	}
}	

/*
 * Create an Agent
 */
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