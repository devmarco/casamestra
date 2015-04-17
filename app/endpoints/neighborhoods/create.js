var model = require('../../models/neighborhoods');
var Valid = require('joi');

/**
 * CREATE A NEIGHBORHOOD
 */
var createNeighborhood = function(req, reply) {
	var Neighborhood = new model(req.payload);

	model.findOne({
		address: {
			lat: req.payload.address.lat,
			lng: req.payload.address.lng
		}
	}, function(err, neighborhood) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		if (!neighborhood) {
			Neighborhood.save(function(err, neighborhood) {
				if (err) {
					return reply({
						'code': 0,
						'message': 'Something bad happened :(',
						'description': err
					});
				}

				reply(neighborhood).code(201);
			});
		} else {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'Already exist an neighborhood in the same address'
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
		method: 'POST',
		path: '/neighborhoods',
		handler: createNeighborhood,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					city: Valid.string().required(),
					name: Valid.string().required(),
					title: Valid.string().required(),
					description: Valid.string().required(),
					cover: Valid.string().required(),
					tags: Valid.array().required(),
					about: {
						neighbors: Valid.string().required(),
						expect: Valid.string().required(),
						lifestyle: Valid.string().required(),
						notexpect: Valid.string().required(),
						market: Valid.string().required(),
						love: Valid.string().required()
					},
					address: {
						local: Valid.string().required(),
						lat: Valid.number().required(),
						lng: Valid.number().required()
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