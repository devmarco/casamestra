/*------------------------------------ *\
	[SCHEMA] ESTATE
\*------------------------------------*/

var Joi = require('joi');

var schema = {
	title: Joi.string(),
	description: Joi.string(),
	location: Joi.object({
		lat: Joi.number(),
		lng: Joi.number()
	}),
	address: Joi.string(),
	bathrooms: Joi.number(),
	bedrooms: Joi.number(),
	cover: Joi.string().uri(),
	photos: Joi.array().items(Joi.string().uri()),
	features: Joi.array().items(Joi.string()),
	details: Joi.array().items(Joi.object({
		type: Joi.string(),
		value: Joi.string()
	})),
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
	exclusive: Joi.boolean(),
	agent: Joi.string(),
	openHouses: Joi.object({
		startTime: Joi.number(),
		endTime: Joi.number()
	}).optional()
}

module.exports = schema;
