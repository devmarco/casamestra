var model = require('../../models/estates');

/**
 * DELETE ALL OF ESTATES
 */
var getOneEstate = function(req, reply) {
	var query = model.find({
		_id: req.params.ID
	}).limit(1);

	query.exec(function(err, estate) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'This estate not exist'
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
		path: '/estates/{ID}',
		handler: getOneEstate
	});
};