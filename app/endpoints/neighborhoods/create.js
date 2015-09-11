/* ------------------------------------ *\
	[NEIGHBORHOODS] CREATE
\* ------------------------------------ */

'use strict';

const Boom 				= require('boom');
const Neighborhoods 	= require('../../config/tables').neighborhoods;
const Schema 			= require('../../models/neighborhood');

const createNeighborhood = (req, reply) => {
	Neighborhoods
		.insert(req.payload, {
			conflict: 'error',
		})
		.run()
		.then(function then(result) {
			if (result.errors !== 0) {
				reply(Boom.conflict('Probably this neighborhood already exist'));
			} else {
				reply(req.payload);
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: 'POST',
	path: '/neighborhoods',
	handler: createNeighborhood,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required',
			},
			payload: Schema,
		},
	},
};
