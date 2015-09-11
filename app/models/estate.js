/* ------------------------------------ *\
	[SCHEMA] ESTATE
\* ------------------------------------ */

'use strict';

const Joi = require('joi');

const schema = {
	description: Joi.string(),
	location: Joi.object({
		lat: Joi.number(),
		lng: Joi.number(),
	}),
	address: Joi.string(),
	bathrooms: Joi.number(),
	bedrooms: Joi.number(),
	garages: Joi.number(),
	images: Joi.object({
		cover: Joi.string().uri(),
		originals: Joi.array().items(Joi.string().uri()),
		thumbnails: Joi.array().items(Joi.string().uri()),
		gallery: Joi.array().items(Joi.string().uri()),
	}),
	keyDetails: Joi.object({
		animals: Joi.any().valid(['dog', 'cat', true, false]),
		neighborhood: Joi.string(),
		city: Joi.string(),
		area: Joi.number(),
		buildingFloors: Joi.number(),
		buildingType: Joi.any().valid(['Andar Corrido', 'Apart Hotel', 'Apartamento', 'Casa', 'Casa em Condominio', 'Cobertura', 'Galpão', 'Loja', 'Lote', 'Lote em Condominio', 'Predio', 'Sala', 'Vaga de Garagem']),
		condominium: Joi.number().optional(),
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
