var estates = require('../../models/estates');

/**
 * GET ALL FAVORITED ESTATES
 */
var getFavorites = function(req, reply) {
	estates.find({
		'favorites.users': {
			$exists: true
		}
	}, function(err, estates) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estates);
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/estates/favorites',
		handler: getFavorites
	});
}