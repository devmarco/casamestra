/* ------------------------------------ *\
	[ALERTS] CREATE
\* ------------------------------------ */

'use strict';

const moment	= require('moment');
const Boom 		= require('boom');
const Joi 		= require('joi');
const Async   	= require('async');
const Alerts 	= require('../../config/tables').alerts;
const Users 	= require('../../config/tables').users;

const createAlert = (req, reply) => {
	function checkUser(next) {
		Users
			.get(req.payload.ucmid)
			.run()
			.then(result => {
				if (result) {
					next();
				} else {
					next(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(() => next(Boom.forbidden('Try again some time')));
	}

	function checkAlerts(next) {
		Alerts
			.filter(alerts => {
				return alerts('filters')
					.eq(req.payload.filters)
					.and(alerts('ucmid')
					.eq(req.payload.ucmid));
			})
			.run()
			.then(result => {
				if (result.length) {
					next(Boom.conflict('Sorry, This alert already exist'));
				} else {
					next();
				}
			}).error(() => next(Boom.forbidden('Try again some time')));
	}

	function create(next) {
		req.payload.createdAt = moment().format('DD-MM-YYYY');

		Alerts
			.insert(req.payload, {
				conflict: 'error',
			})
			.run()
			.then(result => {
				if (result.errors !== 0) {
					next(Boom.conflict('Probably this alert already exist'));
				} else {
					next(null, {
						status: 'success',
						message: 'Alert created',
						filters: req.payload.filters,
					});
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		checkUser,
		checkAlerts,
		create,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'POST',
	path: '/estates/alerts',
	handler: createAlert,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: {
				ucmid: Joi.string().required(),
				filters: Joi.object({
					title: Joi.string(),
					description: Joi.string(),
					location: Joi.object({
						lat: Joi.number(),
						lng: Joi.number(),
					}),
					address: Joi.string(),
					bathrooms: Joi.number(),
					bedrooms: Joi.number(),
					features: Joi.array().items(Joi.string()),
					details: Joi.object({
						type: Joi.string(),
						value: Joi.string(),
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
				}).required(),
			},
		},
	},
};
