var estates = require('../../models/estates');
var users = require('../../models/users');

/**
 * REMOVE A FAVORITE
 */
var deleteFavorite = function(req, reply) {
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
			$pull: {
				'favorites.users': user
			}
		}).exec(function(err, resp) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": 'This estate not exist'
				});
			}

			if (resp.nModified !== 0) {
				return reply({
					'code': 0,
					'message': 'success',
					'description': 'Favorite removed'
				});
			} else {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': 'This favorite not exist'
				});
			}
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
		path: '/estates/{ESTATEID}/favorites/{USERID}',
		handler: deleteFavorite
	});
};