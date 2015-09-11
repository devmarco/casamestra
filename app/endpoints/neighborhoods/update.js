/* ------------------------------------ *\
	[NEIGHBORHOODS] UPDATE
\* ------------------------------------ */

'use strict';

const Boom 			= require('boom');
const Neighborhoods = require('../../config/tables').neighborhoods;
const Schema 		= require('../../models/neighborhood');

const updateNeighborhood = (req, reply) => {
	Neighborhoods
		.get(req.params.ncmid)
		.update(req.payload)
		.run()
		.then(result => {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The neighborhood was updated',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: ['PUT', 'PATCH'],
	path: '/neighborhoods/{ncmid}',
	handler: updateNeighborhood,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: Schema,
		},
	},
};
