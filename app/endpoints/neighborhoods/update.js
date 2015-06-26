/*------------------------------------*\
	[NEIGHBORHOODS] UPDATE
\*------------------------------------*/

var Boom 			= require('boom');
var Joi 			= require('joi');
var Neighborhoods 	= require('../../config/tables').neighborhoods;
var Schema 			= require('../../models/neighborhood');

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/neighborhoods/{NCMID}',
	handler: updateNeighborhood,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'optional'
			},
			payload: Schema
		}
	}
}

function updateNeighborhood(req, reply) {
	
	Neighborhoods
		.get(req.params.NCMID)
		.update(req.payload)
		.run()
		.then(function(result) {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The neighborhood was updated'
				});
			}
			
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleUpdate;
