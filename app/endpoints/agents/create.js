var model = require('../../models/agents');
var Valid = require('joi');

/**
 * CREATE A NEW AGENT
 */
var createAgent = function(req, reply) {
	var Agent = new model(req.payload);

	model.findOne({
		creci: req.payload.creci
	}, function(err, agent) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		if (!agent) {
			Agent.save(function(err, agent) {
				if (err) {
					return reply({
						'code': 0,
						'message': 'Something bad happened :(',
						'description': err
					});
				}

				reply(agent).code(201);
			});
		} else {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'Already exist an agent with this creci number'
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
		method: 'POST',
		path: '/agents',
		handler: createAgent,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					name: Valid.string().required(),
					email: Valid.string().email().required(),
					phone: {
						office: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required(),
						cellphone: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required()
					},
					description: Valid.string().required(),
					experience: Valid.array().required(),
					expertise: Valid.array().required(),
					creci: Valid.number().required()
				}
			}
		}
	});

	return true;
};