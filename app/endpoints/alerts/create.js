var moment	= require('moment');
var Boom 	= require('boom');
var Joi 	= require('joi');
var Alerts 	= require('../../config/tables').alerts;
var Users 	= require('../../config/tables').users;

/*------------------------------------*\
	[ALERTS] CREATE
\*------------------------------------*/

var handleCreate = {
	method: 'POST',
	path: '/estates/alert',
	handler: createAlert,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				UCMID: Joi.string().required(),
				filters: Joi.object({
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
					birdAllowed: Joi.boolean()
				}).required()
			}
		}
	}
}

/*
 * Create an Alert
 */
function createAlert(req, reply) {
	/*
	 * Check if the User exist before create the alert
	 * This prevent that you associating an alert for an user that not exist
	 */

	Users
		.get(req.payload.UCMID)
		.run()
		.then(function(result) {
			if (result) {
				create();
			} else {
				reply(Boom.notFound('Sorry, this user not exist'));
			}
		}).error(function(err) {
			reply(Boom.forbidden('Try again some time'));
		});

	function create() {

		req.payload.createdAt = moment().format('DD-MM-YYYY');

		Alerts
			.filter(function(alerts) {
				return alerts('filters')
					.eq(req.payload.filters)
					.and(alerts('UCMID')
						.eq(req.payload.UCMID));
			})
			.run()
			.then(function(result) {
				if (result.length) {
					reply(Boom.conflict('Sorry, This alert already exist'));
				} else {
					Alerts
						.insert(req.payload, {
							conflict: 'error'
						})
						.run()
						.then(function(result) {
							if (result.errors !== 0) {
								reply(Boom.conflict('Probably this alert already exist'));
							} else {
								reply({
									status: 'success',
									message: 'Alert created',
									filters: req.payload.filters
								});
							}
							
						}).error(function(err) {
							reply(Boom.badRequest('Something bad happen :('));
						});
				}
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}
}

module.exports = handleCreate;