var Valid = require('joi');
var moment = require('moment');

/*------------------------------------*\
    [ESTATES] CREATE ONE
\*------------------------------------*/

var createEstate = {
	method: 'POST',
	path: '/estates',
	handler: function(req, reply) {
		var DB = req.server.plugins['hapi-mongodb'].db,
			ObjectID = req.server.plugins['hapi-mongodb'].ObjectID,
			collection;

		//Set the collection
		collection = DB.collection('estates');

		//Query
		collection.findOne({
			'address.lat': req.payload.address.lat,
			'address.lat': req.payload.address.lng
		}, function(err, result) {
			if (result.length !== 0) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': 'Already exist an estate in the same address'
				});
			} else {

				//Set the update_at field
				req.payload.created_at = moment().format();

				collection.insertOne(req.payload, function(err, result) {
					if (err) {
						return reply({
							'code': 0,
							'message': 'Something bad happened :(',
							'description': err
						});
					}

					reply(estate).code(201);
				});
			}
		});
	},
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
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = createEstate;