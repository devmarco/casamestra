var model = require('../../models/estates');
var Valid = require('joi');
var moment = require('moment');
var _ = require('lodash');

/**
 * VALIDATION SCHEMA
 */
var validateSchema = Valid.object().keys({
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
});

/**
 * CREATE A ESTATE
 */
var importEstates = function(req, reply) {
	var newEstate,
		estates,
		importsSuccess = 0,
		importsFails = [];

	try {

		estates = JSON.parse(req.payload);

		_.forEach(estates, function(estate, key) {
			//Validate
			Valid.validate(estate, validateSchema, function(err, value) {
				if (err) {
					importsFails.push({
						errorMessage: err.details[0].message,
						estate: value
					});
				} else {

					newEstate = new model(value);

					newEstate.save(function(err) {
						if (err) {
							importsFails.push({
								errorMessage: err.message,
								estate: value
							});
						} else {
							importsSuccess++;
						}

						//Return the value
						if (estates.length === (key + 1)) {
							reply({
								status: 'success',
								successfulImports: importsSuccess,
								failedImports: importsFails.length || 0,
								failedData: importsFails
							})
						}
					});
				}
			});
		});

	} catch (err) {
		return reply({
			'code': 0,
			'message': 'Something bad happened :(',
			'description': 'Json Parse error'
		});
	}
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'POST',
		path: '/estates/import',
		handler: importEstates
	});
};