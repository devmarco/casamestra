var model = require('../../models/users');

/**
 * GET ONE USER
 */
var getOneUser = function(req, reply) {
	var query = model.find({
		_id: req.params.USERID
	}).limit(1);

	query.exec(function(err, user) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'This user not exist'
			});
		}

		return reply(user);
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/users/{USERID}',
		handler: getOneUser
	});
};