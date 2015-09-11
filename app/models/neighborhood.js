/* ------------------------------------ *\
	[SCHEMA] NEIGHBORHOOD
\* ------------------------------------ */

'use strict';

const Joi = require('joi');

const schema = {
	city: Joi.string(),
	name: Joi.string(),
	title: Joi.string(),
	description: Joi.string(),
	cover: Joi.string(),
	photos: Joi.array().items(Joi.string().uri()),
	tags: Joi.array(),
	about: Joi.object({
		neighbors: Joi.string(),
		expect: Joi.string(),
		lifestyle: Joi.string(),
		notExpect: Joi.string(),
		market: Joi.string(),
		love: Joi.string(),
	}),
	address: Joi.object({
		local: Joi.string(),
		lat: Joi.number(),
		lng: Joi.number(),
	}),
	commutetimes: Joi.array().items({
		destination: Joi.string(),
		time: Joi.number(),
	}),
};

module.exports = schema;
