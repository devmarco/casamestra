/* ------------------------------------ *\
	[SCHEMA] ESTATE
\* ------------------------------------ */

var Joi = require('joi');

var schema = {
	title: Joi.string(),
	description: Joi.string(),
	location: Joi.object({
		lat: Joi.number(),
		lng: Joi.number(),
	}),
	address: Joi.string(),
	bathrooms: Joi.number(),
	bedrooms: Joi.number(),
	garages: Joi.number(),
	cover: Joi.string().uri(),
	images: Joi.array().items(Joi.string().uri()),
	features: Joi.array().items(Joi.object({
		original: Joi.string().uri(),
		thumbnail: Joi.string().uri(),
		gallery: Joi.string().uri(),
	})),
	keyDetails: Joi.object({
		dogAllowed: Joi.boolean(),
		catAllowed: Joi.boolean(),
		neighborhood: Joi.string(),
		city: Joi.string(),
		area: Joi.number(),
		buildingFloors: Joi.number(),
		buildingType: Joi.string(),
		condominium: Joi.number(),
	}),
	action: Joi.any().valid(['rent', 'sell']),
	status: Joi.any().valid(['sold', 'rented', 'available', 'negotiation']),
	price: Joi.number(),
	exclusive: Joi.boolean(),
	agent: Joi.string(),
	openHouses: Joi.object({
		startTime: Joi.number(),
		endTime: Joi.number(),
	}).optional(),
};

module.exports = schema;
