/*------------------------------------*\
	[NEIGHBORHOODS] UPDATE
\*------------------------------------*/

var Boom 			= require('boom');
var Joi 			= require('joi');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/neighborhoods/{NCMID}',
	handler: updateNeighborhood,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				city: Joi.string(),
				name: Joi.string(),
				title: Joi.string(),
				description: Joi.string(),
				cover: Joi.string(),
				tags: Joi.array(),
				about: Joi.object({
					neighbors: Joi.string(),
					expect: Joi.string(),
					lifestyle: Joi.string(),
					notexpect: Joi.string(),
					market: Joi.string(),
					love: Joi.string()
				}),
				address: Joi.object({
					local: Joi.string(),
					lat: Joi.number(),
					lng: Joi.number()
				}),
				commutetimes: Joi.array().items({
					destination: Joi.string(),
					time: Joi.number()
				})
			}
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
