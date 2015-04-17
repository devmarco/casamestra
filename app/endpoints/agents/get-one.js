var model = require('../../models/agents');

/**
 * GET ONE AGENT
 */
var getOneAgent = function(req, reply) {
    var query = model.find({
        _id: req.params.ID
    }).limit(1);

    query.exec(function(err, agent) {
        if (err) {
            return reply({
                'code': 0,
                'message': 'Something bad happened :(',
                'description': 'This agent not exist'
            });
        }

        return reply(agent);
    });
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
    server.route({
        method: 'GET',
        path: '/agents/{ID}',
        handler: getOneAgent
    });

    return true;
};
