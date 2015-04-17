var model = require('../../models/estates');

/**
 * DELETE A ESTATE
 */
var deleteEstate = function(req, reply) {
	model.findOne({
		creci: req.params.ID
	}, function(err, estate) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		estate.remove(function(err) {
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
				'description': 'Estate was deleted'
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
		path: '/estates/{ID}',
		handler: deleteEstate
	});
};