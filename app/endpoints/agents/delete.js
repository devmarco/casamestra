var model = require('../../models/agents');

/**
 * DELETE ONE AGENT
 */
var deleteAgent = function(req, reply) {
	model.findOne({
		creci: req.params.CRECI
	}, function(err, agent) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'This agent not exist'
			});
		}

		agent.remove(function(err) {
			if (err) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': err
				});
			}

			return reply({
				'code': 0,
				'message': 'success',
				'description': 'Agent was deleted'
			});
		});
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'DELETE',
		path: '/agents/{CRECI}',
		handler: deleteAgent
	});
};