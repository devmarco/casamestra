var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');
var Storage = require('../alerts/alert-storage');

/*------------------------------------*\
	[ALERTS] CREATE
\*------------------------------------*/

var createAlert = {
	method: 'POST',
	path: '/estates/alert',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ALERTS]
		 */
		var T_ALERTS = r.table('alerts'),
			T_ESTATES = r.table('estates');

		create();

		function create() {
			var payload = req.payload;

			T_ALERTS
				.insert(req.payload, {
					conflict: 'error'
				})
				.run()
				.then(function(result) {
					if (result.errors !== 0) {
						reply(Boom.conflict('Probably this alert already exist'));
					} else {

						try {
							r.table('estates')
								.changes()
								.filter(payload)
								.run({cursor: true})
								.then(function(cursor) {

									//Save cursor
									Storage.set(cursor);

									cursor.toArray().then(function(result) {
										console.log('ALERT', JSON.stringify(result));
									});
								});
						} catch (err) {
							reply(Boom.conflict('Probably this alert already exist'));

						} finally {
							reply({
								message: 'Alert created',
								filters: payload
							});
						}
					}
					
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});
		}
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				title: Joi.string(),
				description: Joi.string(),
				location: Joi.object({
					lat: Joi.number(),
					lng: Joi.number()
				}),
				address: Joi.string(),
				bathrooms: Joi.number(),
				bedrooms: Joi.number(),
				features: Joi.array().items(Joi.string()),
				details: Joi.object({
					type: Joi.string(),
					value: Joi.string()
				}),
				homeType: Joi.string(),
				action: Joi.any().valid(['rent', 'sell']),
				area: Joi.number(),
				garages: Joi.number(),
				price: Joi.number(),
				city: Joi.string(),
				neighborhood: Joi.string(),
				dogAllowed: Joi.boolean(),
				catAllowed: Joi.boolean(),
				birdAllowed: Joi.boolean(),
			}
		}
	}
}

module.exports = createAlert;