var model = require('../../models/users');
var Valid = require('joi');
var bcrypt = require('bcrypt');

/**
 * UPDATE A USER
 */
var updateUser = function(req, reply) {
	var User;

	if (req.payload.password) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.payload.password, salt, function(err, hash) {

				//Set the password as a hash
				req.payload.password = hash;

				update();
			});
		});
	} else {
		update();
	}

	function update() {
		model.update({
				_id: req.params.USERID
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
						'description': 'User was updated'
					});
				} else {
					return reply({
						'code': 0,
						'message': 'Something bad happened :(',
						'description': 'This user not exist'
					});
				}
			});
	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: ['PUT', 'PATCH'],
		path: '/users/{USERID}',
		handler: updateUser,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					first_name: Valid.string(),
					last_name: Valid.string(),
					email: Valid.string().email(),
					phone: {
						home: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
						cellphone: Valid.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
					},
					password: Valid.string()
				}
			}
		}
	});
};