/* ------------------------------------ *\
	[ESTATE] UPDATE
\* ------------------------------------ */

'use strict';

const Boom    = require('boom');
const Async   = require('async');
const Estates = require('../../config/tables').estates;
const Agents 	= require('../../config/tables').agents;
const Schema 	= require('../../models/estate');

const updateEstate = (req, reply) => {
	function checkAgent(next) {
		if (!req.payload.agent) return next(null, '');
		Agents
			.get(req.payload.agent)
			.run()
			.then(result => {
				if (result) {
					next(null, result);
				} else {
					next(Boom.notFound('Sorry, this agent not exist'));
				}
			}).error(() => next(Boom.forbidden('Try again some time')));
	}

	function update(agent, next) {
		if (agent) req.payload.agent = agent;

		req.payload.updatedAt = new Date();

		Estates
			.get(req.params.ecmid)
			.update(req.payload)
			.run()
			.then(result => {
				if (result.replaced === 0) {
					next(Boom.badRequest('Something bad happen :('));
				} else {
					next(null, {
						status: 'success',
						message: 'The estate was updated',
					});
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		checkAgent,
		update,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: ['PUT', 'PATCH'],
	path: '/estates/{ecmid}',
	handler: updateEstate,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: Schema,
		},
	},
};
