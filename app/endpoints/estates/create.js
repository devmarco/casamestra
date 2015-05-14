var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[ESTATES] CREATE
\*------------------------------------*/

var createAgent = {
	method: 'POST',
	path: '/estates',
	handler: function(req, reply) {

		/* First we need check if has an Agent
		 * If yes, we need check if the Agent exist
		 */
		if (req.payload.agent) {
			r.table('agents')
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
		 * Create Estate
		 */
		function create() {

			r.table('estates')
				.filter({
					location: {
						lat: req.payload.location.lat,
						lng: req.payload.location.lng
					}
				})
				.run()
				.then(function(result) {
					console.log(result);
					if (result.length !== 0) {
						r.table('estates')
							.insert(req.payload, {
								conflict: 'error'
							})
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
				area: Joi.number().required(),
				garages: Joi.number().required(),
				price: Joi.number().required(),
				city: Joi.string().required(),
				neighborhood: Joi.string().required(),
				dogAllowed: Joi.boolean(),
				catAllowed: Joi.boolean(),
				birdAllowed: Joi.boolean(),
				exclusive: Joi.boolean(),
				agent: Joi.number()
			}
		}
	}
}

module.exports = createAgent;
