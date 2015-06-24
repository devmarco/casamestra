/*------------------------------------*\
	[ESTATE] UPDATE
\*------------------------------------*/

var Boom    = require('boom');
var Joi     = require('joi');
var Estates = require('../../config/tables').estates;
var Agents 	= require('../../config/tables').agents;
var Users 	= require('../../config/tables').users;

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/estates/{ECMID}',
	handler: updateEstate,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				title: Joi.string(),
				description: Joi.string(),
				location: Joi.object({
					lat: Joi.number(),
					lng: Joi.number()
				}),
				address: Joi.string(),
				bathrooms: Joi.number(),
				bedrooms: Joi.number(),
				photos: Joi.object({
					cover: Joi.string().uri(),
					gallery: Joi.array().items(Joi.string().uri())
				}),
				features: Joi.array().items(Joi.string()),
				details: Joi.object({
					type: Joi.string(),
					value: Joi.string()
				}),
				homeType: Joi.string(),
				action: Joi.any().valid(['rent', 'sell']),
				status: Joi.any().valid(['sold', 'rented', 'available', 'negotiation']),
				area: Joi.number(),
				garages: Joi.number(),
				price: Joi.number(),
				city: Joi.string(),
				neighborhood: Joi.string(),
				dogAllowed: Joi.boolean(),
				catAllowed: Joi.boolean(),
				birdAllowed: Joi.boolean(),
				exclusive: Joi.boolean(),
				updatedAt: Joi.date(),
				ACMID: Joi.string(),
				UCMID: Joi.string()
			}
		}
	}
}

function updateEstate(req, reply) {

	req.payload.updatedAt = new Date();

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

	(function update() {
		Estates
			.get(req.params.ECMID)
			.update(req.payload)
			.run()
			.then(function(result) {
				if (result.replaced === 0) {
					reply(Boom.badRequest('Something bad happen :('));
				} else {
					reply({
						message: 'The estate was updated'
					});
				}
				
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	}());
}

module.exports = handleUpdate;