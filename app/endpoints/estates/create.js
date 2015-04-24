var Valid = require('joi');
var moment = require('moment');
var Boom = require('boom');

/*------------------------------------*\
    [ESTATES] CREATE ONE
\*------------------------------------*/

var createEstate = {
	method: 'POST',
	path: '/estates',
	handler: function(req, reply) {
		var DB = req.server.plugins['hapi-mongodb'].db,
			OBJECTID = req.server.plugins['hapi-mongodb'].ObjectID,
			DATABASE,
			estate;

		//Set the collection
		DATABASE = DB.collection('estates');

		//Get the payload
		estate = req.payload;

		//Checks if this estate was associated with an agent
		if (estate.agent) {

			if (!OBJECTID.isValid(estate.agent)) {
				return Boom.notFound('The agent ' + estate.agent + ' not exist');
			};

			//Search agent
			DATABASE.findOne({
				_id: estate.agent

			}, function(err, result) {

				if (err) {
					return Boom.badRequest(err);
				}

				createEstate(result);
			});

		} else createEstate();

		function createEstate(agent) {
			DATABASE.findOne({
				'address.lat': req.payload.address.lat,
				'address.lat': req.payload.address.lng

			}, function(err, result) {

				if (result.length !== 0) {
					return Boom.badRequest(err);

				} else {

					//Set the update_at field
					req.payload.created_at = moment().format();

					collection.insertOne(req.payload, function(err, result) {
						if (err) {
							return Boom.badRequest(err);
						}

						reply(estate).code(201);
					});
				}
			});
		}
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
					photos: Valid.array().items(Valid.string().uri())
				},
				features: Valid.array().items(Valid.string()),
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
				featured: Valid.boolean(),
				agent: Valid.number(),
				dogs_allowed: Valid.boolean()
			}
		}
	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = createEstate;