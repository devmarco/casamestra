/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi   	= require('joi');
const filter 	= require('../../util/filters');
const Estates 	= require('../../config/tables').estates;

const getEstates = (req, reply) => {
	const filterQuery = filter(Estates, req, {
		action: 'sell',
	});

	function getBuyWithFilter() {
		filterQuery
			.run()
			.then(result => reply(result))
			.error(() => reply(Boom.badRequest('Try again some time')));
	}

	function getBuy() {
		Estates
			.filter({
				action: 'sell',
			})
			.run()
			.then(result => reply(result))
			.error(() => reply(Boom.badRequest('Try again some time')));
	}

	(filterQuery) ? getBuyWithFilter() : getBuy();
};

module.exports = {
	method: 'GET',
	path: '/estates/buy',
	handler: getEstates,
	config: {
		validate: {
			query: {
				limit: Joi.number(),
				offset: Joi.number(),
				fields: Joi.string(),
			},
		},
	},
};
