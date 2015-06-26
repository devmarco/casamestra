/*------------------------------------ *\
	[NEIGHBORHOODS] CREATE
\*------------------------------------*/

var Boom 			= require('boom');
var Joi 			= require('joi');
var Neighborhoods 	= require('../../config/tables').neighborhoods;
var Schema 			= require('../../models/neighborhood');

var handleCreate = {
	method: 'POST',
	path: '/neighborhoods',
	handler: createNeighborhood,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required'
			},
			payload: Schema
		}
	}
}

function createNeighborhood(req, reply) {
	
	Neighborhoods
		.insert(req.payload, {
			conflict: 'error'
		})
		.run()
		.then(function(result) {
			if (result.errors !== 0) {
				reply(Boom.conflict('Probably this neighborhood already exist'));
			} else {
				reply(req.payload);
			}
			
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleCreate;
