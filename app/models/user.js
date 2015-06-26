/*------------------------------------ *\
	[SCHEMA] USER
\*------------------------------------*/

var Joi = require('joi');

var schema = {
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string().email(),
	phones: Joi.object({
		cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
		homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
	}),
	password: Joi.string()
}

module.exports = schema;
