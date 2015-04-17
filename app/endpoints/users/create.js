var model = require('../../models/users');
var Valid = require('joi');
var bcrypt = require('bcrypt');

/**
 * CREATE A USER
 */
var createUser = function(req, reply) {
	var User = new model(req.payload);

	model.findOne({
		email: req.payload.email
	}, function(err, user) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		if (!user) {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.payload.password, salt, function(err, hash) {

					//Set password as a hash
					User.password = hash;

					User.save(function(err, user) {
						if (err) {
							return reply({
								'code': 0,
								'message': 'Something bad happened :(',
								'description': err
							});
						}

						reply(user).code(201);
					});
				});
			});
		} else {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'Already exist an user with this email'
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
		path: '/users',
		handler: createUser,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					first_name: Valid.string().required(),
					last_name: Valid.string().required(),
					email: Valid.string().email().required(),
					phone: {
						home: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
						cellphone: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required()
					},
					password: Valid.string().required()
				}
			}
		}
	});
};