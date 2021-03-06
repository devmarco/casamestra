/* ------------------------------------ *\
	[ESTATE] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi   	= require('joi');
const Filter 	= require('../../util/filters');
const Estates 	= require('../../config/tables').estates;

const getEstates = (req, reply) => {
	const EstatesFiltered = new Filter(Estates, req, {
		action: 'sell',
	});

	function getBuyWithFilter() {
		EstatesFiltered
			.query()
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

	(EstatesFiltered) ? getBuyWithFilter() : getBuy();
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
