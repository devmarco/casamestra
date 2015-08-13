/* ------------------------------------ *\
	[NEIGHBORHOODS] UPDATE
\* ------------------------------------ */

var Boom 			= require('boom');
var Joi 			= require('joi');
var Neighborhoods 	= require('../../config/tables').neighborhoods;
var Schema 			= require('../../models/neighborhood');

function updateNeighborhood(req, reply) {
	Neighborhoods
		.get(req.params.ncmid)
		.update(req.payload)
		.run()
		.then(function then(result) {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The neighborhood was updated',
				});
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

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
