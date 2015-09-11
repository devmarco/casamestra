/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi   	= require('joi');
const filter 	= require('../../util/filters');
const Estates 	= require('../../config/tables').estates;

const  getEstates = (req, reply) => {
	const filterQuery = filter(Estates, req);

	function getWithFilter() {
		filterQuery
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

	(filterQuery) ? getWithFilter() : get();
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
