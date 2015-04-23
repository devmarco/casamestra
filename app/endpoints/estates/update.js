var Valid = require('joi');
var moment = require('moment');

/*------------------------------------*\
    [ESTATES] UPDATE ONE
\*------------------------------------*/
var updateEstate = {
	method: ['PUT', 'PATCH'],
	path: '/estates/{ESTATEID}',
	handler: function(req, reply) {
		var DB = req.server.plugins['hapi-mongodb'].db,
			ObjectID = req.server.plugins['hapi-mongodb'].ObjectID,
			collection;

		//Set the collection
		collection = DB.collection('estates');

		//Checks if the ESTATEID is a valid ObjectID
		if (!ObjectID.isValid(req.params.ESTATEID)) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'This estate not exist'
			});
		}

		//Set the update_at field
		req.payload.update_at = moment().format();

		collection.updateOne({
			_id: new ObjectID(req.params.ESTATEID)
		}, {
			$set: req.payload
		}, function(err, result) {
			if (err) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': err
				});
			}

			reply({
				'code': 0,
				'message': 'success',
				'description': 'Estate was changed'
			});

		});

	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				title: Valid.string(),
				address: {
					local: Valid.string(),
					lat: Valid.number(),
					lng: Valid.number()
				},
				gallery: {
					cover: Valid.string().uri(),
					photos: Valid.array()
				},
				features: Valid.array(),
				details: Valid.array(),
				type: Valid.string(),
				area: Valid.number(),
				bedroom: Valid.number(),
				bathroom: Valid.number(),
				park: Valid.number(),
				price: Valid.number(),
				description: Valid.string(),
				estate_type: Valid.string(),
				exclusive: Valid.boolean(),
				neighborhood: Valid.array()
			}
		}
	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = updateEstate;