var model = require('../../models/neighborhoods');
var Valid = require('joi');

/**
 * UPDATE A NEIGHBORHOOD
 */

var updateNeighborhood = function(req, reply) {
	var Neighborhood;

	model.update({
			_id: req.params.ID
		},
		req.payload,
		function(err, resp) {
			if (err) reply(err);

			if (resp.nModified !== 0) {
				reply({
					status: 'Neighborhood updated'
				});
			} else {
				reply({
					status: 'No neighborhood was affected'
				});
			}
		});
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: ['PUT', 'PATCH'],
		path: '/neighborhoods/{ID}',
		handler: updateNeighborhood,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					city: Valid.string(),
					name: Valid.string(),
					title: Valid.string(),
					description: Valid.string(),
					cover: Valid.string(),
					tags: Valid.array(),
					about: {
						neighbors: Valid.string(),
						expect: Valid.string(),
						lifestyle: Valid.string(),
						notexpect: Valid.string(),
						market: Valid.string(),
						love: Valid.string()
					},
					address: {
						local: Valid.string(),
						lat: Valid.number(),
						lng: Valid.number()
					},
					commutetimes: Valid.array().items({
						destination: Valid.string(),
						time: Valid.number()
					})
				}
			}
		}
	});
};