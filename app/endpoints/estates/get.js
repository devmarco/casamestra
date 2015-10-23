/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi   	= require('joi');
const Filter 	= require('../../util/filters');
const Estates 	= require('../../config/tables').estates;

const  getEstates = (req, reply) => {
	const EstatesFiltered = new Filter(Estates, req);

	function getWithFilter() {
		EstatesFiltered
			.query()
			.run()
			.then(result => reply(result))
			.error(() => reply(Boom.badRequest('Try again some time')));
	}

	function get() {
		Estates
			.run()
			.then(result => reply(result))
			.error(() => reply(Boom.badRequest('Try again some time')));
	}

	(EstatesFiltered) ? getWithFilter() : get();
};

module.exports = {
	method: 'GET',
	path: '/estates',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number(),
				fields: Joi.string(),
				bedrooms: Joi.number(),
				price: Joi.number(),
				bathrooms: Joi.number(),
				neighborhood: Joi.string(),
			},
		},
	},
};
