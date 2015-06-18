var Boom    = require('boom');
var Joi     = require('joi');
var Estates = require('../../config/tables').estates;

/*------------------------------------*\
	[ESTATE] UPDATE
\*------------------------------------*/

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/estates/{ECMID}',
	handler: updateEstate,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				title: Joi.string(),
				description: Joi.string(),
				location: Joi.object({
					lat: Joi.number(),
					lng: Joi.number()
				}),
				address: Joi.string(),
				bathrooms: Joi.number(),
				bedrooms: Joi.number(),
				photos: Joi.object({
					cover: Joi.string().uri(),
					gallery: Joi.array().items(Joi.string().uri())
				}),
				features: Joi.array().items(Joi.string()),
				details: Joi.object({
					type: Joi.string(),
					value: Joi.string()
				}),
				homeType: Joi.string(),
				action: Joi.any().valid(['rent', 'sell']),
				status: Joi.any().valid(['sold', 'rented', 'available', 'negotiation']),
				area: Joi.number(),
				garages: Joi.number(),
				price: Joi.number(),
				city: Joi.string(),
				neighborhood: Joi.string(),
				dogAllowed: Joi.boolean(),
				catAllowed: Joi.boolean(),
				birdAllowed: Joi.boolean(),
				exclusive: Joi.boolean(),
				agent: Joi.number(),
				updatedAt: Joi.date()
			}
		}
	}
}

/*
 * Update an Estate
 */
function updateEstate(req, reply) {

	//Add updatedAt to payload
	req.payload.updatedAt = new Date();

	Estates
		.get(req.params.ECMID)
		.update(req.payload)
		.run()
		.then(function(result) {
			if (result.replaced === 0) {
				reply(Boom.badRequest('Something bad happen :('));
			} else {
				reply({
					message: 'The estate was updated'
				});
			}
			
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleUpdate;