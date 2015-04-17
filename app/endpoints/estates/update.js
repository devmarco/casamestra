var model = require('../../models/estates');
var Valid = require('joi');
var moment = require('moment');

/**
 * UPDATE A ESTATE
 */
var updateEstate = function(req, reply) {
	var Estate;

	model.update({
			_id: req.params.ID
		},
		req.payload,
		function(err, resp) {
			if (err) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': err
				});
			}

			if (resp.nModified !== 0) {

				//Set the created date
				Estate.updated_at = moment().format();

				return reply({
					'code': 0,
					'message': 'success',
					'description': 'Estate was changed'
				});
			} else {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': 'This estate not exist'
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
		path: '/estates/{ID}',
		handler: updateEstate,
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
	});
};