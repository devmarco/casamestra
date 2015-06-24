/*------------------------------------*\
	[ESTATES] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Estates = require('../../config/tables').estates;
var Agents 	= require('../../config/tables').agents;
var Users 	= require('../../config/tables').users;

var handleEstate = {
	method: 'POST',
	path: '/estates',
	handler: createEstate,
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
				ACMID: Joi.string(),
				UCMID: Joi.string()
			}
		}
	}
}

function createEstate(req, reply) {

	(function checkAgent() {

		if (!req.payload.ACMID) return false;

		Agents
			.get(req.payload.ACMID)	
			.run()
			.then(function(result) {
				if (!result) {
					reply(Boom.notFound('Sorry, this agent not exist'));
				} 
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}());

	(function checkUser() {

		if (!req.payload.UCMID) return false;

		Users
			.get(req.payload.UCMID)	
			.run()
			.then(function(result) {
				if (!result) {
					reply(Boom.notFound('Sorry, this user not exist'));
				} 
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}());

	(function create() {
		
		Estates
			.filter({
				location: req.payload.location
			})
			.run()
			.then(function(result) {
				if (result.length === 0) {
					//Add updatedAt to payload
					req.payload.createdAt = new Date();

					Estates
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
	}());
}

module.exports = handleEstate;
