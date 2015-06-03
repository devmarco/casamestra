var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[ESTATES] CREATE
\*------------------------------------*/

var createEstate = {
	method: 'POST',
	path: '/estates',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ESTATES]
		 */
		T_ESTATES = r.table('estates');

		/* First we need check if has an Agent
		 * If yes, we need check if the Agent exist
		 */
		if (req.payload.agent) {
			T_ESTATES
				.get(req.payload.agent)	
				.run()
				.then(function(result) {
					if (result) {
						create();
					} else {
						reply(Boom.notFound('Sorry, this agent not exist'));
					}
				}).error(function(err) {
					reply(Boom.forbidden('Try again some time'));
				});
		} else {
			create();
		}

		/*
		 * Create the estate
		 * Check if the address already exist
		 */
		function create() {
			T_ESTATES
				.filter({
					location: req.payload.location
				})
				.run()
				.then(function(result) {
					if (result.length === 0) {
						//Add updatedAt to payload
						req.payload.createdAt = new Date();

						T_ESTATES
							.insert(req.payload)
							.run()
							.then(function(result) {
								if (result.errors !== 0) {
									reply(Boom.conflict('Probably this estate already exist'));
								} else {
									reply(req.payload);
								}
								
							}).error(function(err) {
								reply(Boom.badRequest('Something bad happen :('));
							});
					} else {
						reply(Boom.conflict('Already exist an estate with the same address'));
					}
				})
				.error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		}
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				title: Joi.string().required(),
				description: Joi.string().required(),
				location: Joi.object({
					lat: Joi.number(),
					lng: Joi.number()
				}).required(),
				address: Joi.string().required(),
				bathrooms: Joi.number().required(),
				bedrooms: Joi.number().required(),
				photos: Joi.object({
					cover: Joi.string().uri().required(),
					gallery: Joi.array().items(Joi.string().uri())
				}).required(),
				features: Joi.array().items(Joi.string()).required(),
				details: Joi.object({
					type: Joi.string(),
					value: Joi.string()
				}),
				homeType: Joi.string().required(),
				action: Joi.any().valid(['rent', 'sell']).required(),
				status: Joi.any().valid(['sold', 'rented', 'available', 'negotiation']).required(),
				area: Joi.number().required(),
				garages: Joi.number().required(),
				price: Joi.number().required(),
				city: Joi.string().required(),
				neighborhood: Joi.string().required(),
				dogAllowed: Joi.boolean(),
				catAllowed: Joi.boolean(),
				exclusive: Joi.boolean(),
				agent: Joi.number()
			}
		}
	}
}

module.exports = createEstate;
