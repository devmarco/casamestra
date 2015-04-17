var estates = require('../../models/estates');
var users = require('../../models/users');

/**
 * ADD THE FAVORITE
 */
var createFavorite = function(req, reply) {
	users.findOne({
		_id: req.params.USERID
	}, function(err, user) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'This user not exist'
			});
		}

		estates.update({
			_id: req.params.ESTATEID
		}, {
			$addToSet: {
				'favorites.users': user
			}
		}, {
			upsert: true
		}).exec(function(err, estate) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": 'This estate not exist'
				});
			}

			reply({
				'code': 0,
				'message': 'success',
				'description': 'Favorite added'
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
		method: 'POST',
		path: '/estates/{ESTATEID}/favorites/{USERID}',
		handler: createFavorite
	});
}