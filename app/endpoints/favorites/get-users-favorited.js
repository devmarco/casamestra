var estates = require('../../models/estates');

/**
 * GET ALL USERS THAT HAVE A ESTATE AS YOUR FAVORITE
 */
var getUsersFavorited = function(req, reply) {
	estates.find({
		_id: req.params.ESTATEID,
		'favorites.users': {
			$exists: true
		}
	}, function(err, estate) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estate[0].favorites.users);
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/estates/{ESTATEID}/favorites/users',
		handler: getUsersFavorited
	});
}