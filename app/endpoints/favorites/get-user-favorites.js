var estates = require('../../models/estates');

/**
 * GET ALL FAVORITES OF USER
 */
var getUserFavorite = function(req, reply) {
	estates.find({
		'favorites.users._id': req.params.USERID
	}, function(err, estate) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estate);
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/estates/favorites/{USERID}',
		handler: getUserFavorite
	});
}