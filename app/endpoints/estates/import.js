var Valid = require('joi');
var moment = require('moment');
var _ = require('lodash');

/*------------------------------------*\
    [ESTATES] IMPORT MANY
\*------------------------------------*/

var createEstate = {
	method: 'POST',
	path: '/estates/import',
	handler: function(req, reply) {
		var DB = req.server.plugins['hapi-mongodb'].db,
			ObjectID = req.server.plugins['hapi-mongodb'].ObjectID,
			estates,
			collection,
			validateSchema,
			importsFails = [],
			importsSuccess = [];

		//Set the collection
		collection = DB.collection('estates');

		/**
		 * VALIDATION SCHEMA
		 */
		validateSchema = Valid.object().keys({
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

					//Set the update_at field
					value.created_at = moment().format();
					importsSuccess.push(value);
				}
			});
		});

		//Query
		collection.insertMany(importsSuccess, {}, function(err, result) {
			if (err) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': err
				});
			}

			reply({
				code: 1,
				insertedDocuments: importsSuccess.length,
				faillureDocuments: {
					count: importsFails.length,
					data: importsFails
				}
			});
		});
	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = createEstate;