var model = require('../../models/users');

/**
 * DELETE A USER
 */
var deleteUser = function(req, reply) {
	model.findOne({
		_id: req.params.USERID
	}, function(err, user) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		user.remove(function(err) {
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
				'description': 'User was deleted'
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
		path: '/users/{USERID}',
		handler: deleteUser
	});
};