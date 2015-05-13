var DB      = require('../../config/settings').db;
var r       = require('rethinkdbdash')(DB);
var Boom    = require('boom');
var Joi     = require('joi');

/*------------------------------------*\
    [AGENTS] CREATE
\*------------------------------------*/

var createAgent = {
    method: ['PUT', 'PATCH'],
    path: '/agents/{CRECI}',
    handler: function(req, reply) {
        r.table('agents')
            .get(parseInt(req.params.CRECI))
            .update(req.payload)
            .run()
            .then(function(result) {
                if (result.replaced === 0) {
                    reply(Boom.forbidden('Something bad happen :('));
                } else {
                    reply({
                        message: 'The agent was updated'
                    });
                }
                
            }).error(function(err) {
                reply(Boom.forbidden('Something bad happen :('));
            });
    },
    config: {
        validate: {
            options: {
                abortEarly: false
            },
            payload: {
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string().email(),
                phones: {
                    cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
                    homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
                },
                description: Joi.string(),
                experience: Joi.array(),
                creci: Joi.number()
            }
        }
    }
}

module.exports = createAgent;