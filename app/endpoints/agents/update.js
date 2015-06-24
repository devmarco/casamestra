/*------------------------------------*\
	[AGENTS] CREATE
\*------------------------------------*/

var Boom    = require('boom');
var Joi     = require('joi');
var Agents 	= require('../../config/tables').agents;

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/agents/{ACMID}',
	handler: updateAgent,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				firstName: Joi.string(),
				lastName: Joi.string(),
				email: Joi.string().email(),
				phones: Joi.object({
					cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
					homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
				}),
				description: Joi.string(),
				about: Joi.object({
					academic: Joi.array().items(Joi.string()),
					professional: Joi.array().items(Joi.string()),
					expertise: Joi.array().items(Joi.string()),
					languages: Joi.array().items(Joi.string())
				}),
				creci: Joi.number()
			}
		}
	}
}

function updateAgent(req, reply) {
	
	Agents
		.get(req.params.ACMID)
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