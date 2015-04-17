var model = require('../../models/agents');

/**
 * GET ALL OF AGENTS
 */
var getAgents = function(req, reply) {
    if (req.query.limit && req.query.offset) {
        if (typeof parseInt(req.query.limit) !== 'number' || typeof parseInt(req.query.offset) !== 'number') {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": 'Limit and Offset must be a number'
            });
        }

        filterByLimitAndOffset(req, reply);
    } else if (req.query.offset) {

        if (typeof parseInt(req.query.offset) !== 'number') {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": 'Offset must be a number'
            });
        }

        filterByOffset(req, reply);
    } else if (req.query.limit) {

        if (typeof parseInt(req.query.limit) !== 'number') {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": 'Limit must be a number'
            });
        }

        filterByLimit(req, reply);
    } else {
        getAllResults(req, reply);
    }
}

function filterByLimit(req, reply) {
    var query = model.find().limit(req.query.limit);

    query.exec(function(err, agents) {
        if (err) {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": err
            });
        }

        reply(agents);
    });
}

function filterByOffset(req, reply) {
    var query = model.find().skip(req.query.offset);

    query.exec(function(err, agents) {
        if (err) {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": err
            });
        }

        reply(agents);
    });
}

function filterByLimitAndOffset(req, reply) {
    var query = model.find().skip(req.query.offset).limit(req.query.limit);

    query.exec(function(err, agents) {
        if (err) {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": err
            });
        }

        reply(agents);
    });
}

function getAllResults(req, reply) {
    model.find(function(err, agents) {
        if (err) {
            return reply({
                "code": 0,
                "message": "Something bad happened :(",
                "description": err
            });
        }

        reply(agents);
    });
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
    server.route({
        method: 'GET',
        path: '/agents',
        handler: getAgents
    });
};