/* ------------------------------------ *\
	[ESTATES] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Async   	= require('async');
const Estates 	= require('../../config/tables').estates;
const Agents 	= require('../../config/tables').agents;
const Schema 	= require('../../models/estate');

const createEstate = (req, reply) => {
	function checkAgent(next) {
		Agents
			.get(req.payload.agent)
			.run()
			.then(result => {
				if (result) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This agent not exist'));
				}
			})
			.error(() => next(Boom.badRequest('Try again some time')));
	}

	function checkLocation(agent, next) {
		Estates
			.filter(Estates.r.row('location').eq(req.payload.location))
			.run()
			.then(result => {
				if (result.length === 0) {
					next(null, agent);
				} else {
					next(Boom.conflict('Already exist an estate with the same address'));
				}
			})
			.error(() => next(Boom.badRequest('Try again some time')));
	}

	function create(agent, next) {
		req.payload.createdAt = new Date();
		req.payload.agent = agent;

		Estates
			.insert(req.payload)
			.run()
			.then(result => {
				if (result.errors !== 0) {
					next(Boom.conflict('Probably this estate already exist'));
				} else {
					next(null, req.payload);
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		checkAgent,
		checkLocation,
		create,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'POST',
	path: '/estates',
	handler: createEstate,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required',
			},
			payload: Schema,
		},
	},
};
