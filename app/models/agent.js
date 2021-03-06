/* ------------------------------------ *\
	[SCHEMA] AGENT
\* ------------------------------------ */

'use strict';

const Joi = require('joi');

const schema = {
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string().email(),
	cover: Joi.string().uri(),
	phones: Joi.object({
		cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
		homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
	}),
	description: Joi.string(),
	about: Joi.object({
		academic: Joi.array().items(Joi.string()).optional(),
		professional: Joi.array().items(Joi.string()),
		expertise: Joi.array().items(Joi.string()),
		languages: Joi.array().items(Joi.string()),
	}),
	creci: Joi.number(),
};

module.exports = schema;
