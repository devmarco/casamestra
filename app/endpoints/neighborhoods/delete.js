var model = require('../../models/neighborhoods');

/**
 * REMOVE A NEIGHBORHOOD
 */
var deleteNeighborhood = function(req, reply) {
	model.findOne({
		_id: req.params.ID
	}, function(err, neighborhood) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		neighborhood.remove(function(err) {
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
				'description': 'Neighborhood was deleted'
			});
		})
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'DELETE',
		path: '/neighborhoods/{ID}',
		handler: deleteNeighborhood
	});
};