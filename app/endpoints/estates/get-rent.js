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
		action: 'rent',
	});

	function getRentWithFilter() {
		EstatesFiltered
			.query()
			.run()
			.then(result => {
				reply(result);
			}).error(() => reply(Boom.badRequest('Try again some time')));
	}

	function getRent() {
		Estates
			.filter({
				action: 'rent',
			})
			.run()
			.then(result => reply(result))
			.error(() => reply(Boom.badRequest('Try again some time')));
	}

	(EstatesFiltered) ? getRentWithFilter() : getRent();
};

module.exports = {
	method: 'GET',
	path: '/estates/rent',
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
