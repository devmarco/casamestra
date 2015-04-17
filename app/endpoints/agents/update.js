var model = require('../../models/agents');
var Valid = require('joi');

/**
 * UPDATE A AGENT
 */
var updateAgent = function(req, reply) {
    var Agent;

    model.update({
        creci: req.params.CRECI
    },
    req.payload,
    function(err, resp) {
        if (err) {
            return reply({
                'code': 0,
                'message': 'Something bad happened :(',
                'description': err
            });
        }

        if (resp.nModified !== 0) {
            return reply({
                'code': 0,
                'message': 'success',
                'description': 'Agent was updated'
            });
        } else {
            return reply({
                'code': 0,
                'message': 'Something bad happened :(',
                'description': 'This agent not exist'
            });
        }
    });
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
    server.route({
        method: ['PUT', 'PATCH'],
        path: '/agents/{CRECI}',
        handler: updateAgent,
        config: {
            validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    name: Valid.string(),
                    email: Valid.string().email(),
                    phone: {
                        office: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
                        cellphone: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
                    },
                    description: Valid.string(),
                    experience: Valid.array(),
                    expertise: Valid.array(),
                    creci: Valid.number()
                }
            }
        }
    });

    return true;
};
