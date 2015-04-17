var model = require('../../models/estates');
var Valid = require('joi');
var moment = require('moment');

/**
 * CREATE A ESTATE
 */
var createEstate = function(req, reply) {
	var Estate = new model(req.payload);

	model.findOne({
		'address.lat': req.payload.address.lat,
		'address.lat': req.payload.address.lng
	}, function(err, estate) {
		if (err) {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': err
			});
		}

		if (!estate) {

			//Set the created date
			Estate.created_at = moment().format();

			Estate.save(function(err, estate) {
				if (err) {
					return reply({
						'code': 0,
						'message': 'Something bad happened :(',
						'description': err
					});
				}

				reply(estate).code(201);
			});
		} else {
			return reply({
				'code': 0,
				'message': 'Something bad happened :(',
				'description': 'Already exist an estate in the same address'
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
		path: '/estates',
		handler: createEstate,
		config: {
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					title: Valid.string().required(),
					address: {
						local: Valid.string().required(),
						lat: Valid.number().required(),
						lng: Valid.number().required()
					},
					gallery: {
						cover: Valid.string().uri().required(),
						photos: Valid.array()
					},
					features: Valid.array(),
					details: Valid.array(),
					type: Valid.string().required(),
					area: Valid.number().required(),
					bedroom: Valid.number().required(),
					bathroom: Valid.number().required(),
					park: Valid.number().required(),
					price: Valid.number().required(),
					description: Valid.string().required(),
					estate_type: Valid.string().required(),
					exclusive: Valid.boolean().required(),
					neighborhood: Valid.string().required(),
					featured: Valid.boolean()
				}
			}
		}
	});
};