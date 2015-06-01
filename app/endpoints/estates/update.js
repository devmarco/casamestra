var DB      = require('../../config/settings').db;
var r       = require('rethinkdbdash')(DB);
var Boom    = require('boom');
var Joi     = require('joi');

/*------------------------------------*\
    [ESTATE] UPDATE
\*------------------------------------*/

var updateEstate = {
    method: ['PUT', 'PATCH'],
    path: '/estates/{ECMID}',
    handler: function(req, reply) {

        req.payload.updatedAt = new Date();

        r.table('estates')
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
    },
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

module.exports = updateEstate;