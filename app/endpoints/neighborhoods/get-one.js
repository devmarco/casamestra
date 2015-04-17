var model = require('../../models/neighborhoods');

/**
 * GET ONE NEIGHBORHOOD
 */
var getOneNeighborhood = function(req, reply) {
	var query = model.find({
		_id: req.params.ID
	}).limit(1);

	query.exec(function(err, neighborhood) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'This neighborhood not exist'
			});
		}

		reply(neighborhood);
	});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/neighborhoods/{ID}',
		handler: getOneNeighborhood
	});
};