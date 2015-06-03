var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------ *\
	[AGENTS] CREATE
\*------------------------------------*/

var createAgent = {
	method: 'POST',
	path: '/agents',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [AGENTS]
		 */
		T_AGENTS = r.table('agents');

		create();

		function create() {
			T_AGENTS
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
	},
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

module.exports = createAgent;