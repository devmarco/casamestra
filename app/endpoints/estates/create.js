/*------------------------------------*\
	[ESTATES] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Estates = require('../../config/tables').estates;
var Agents 	= require('../../config/tables').agents;
var Users 	= require('../../config/tables').users;
var Schema 	= require('../../models/estate');

var handleEstate = {
	method: 'POST',
	path: '/estates',
	handler: createEstate,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required'
			},
			payload: Schema
		}
	}
}

function createEstate(req, reply) {

	function checkAgent(next) {
		Agents
			.get(req.payload.agent)
			.run()
			.then(function(result) {
				if (result) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This agent not exist'));
				}
			})
			.error(function(err) {
				next(Boom.badRequest('Try again some time'));
			});
	}

	function checkLocation(agent, next) {

		Estates
			.filter(Estates.r.row('location').eq(req.payload.location))
			.run()
			.then(function(result) {
				if (result.length === 0) {
					next(null, agent);
				} else {
					next(Boom.conflict('Already exist an estate with the same address'));
				}
			})
			.error(function(err) {
				next(Boom.badRequest('Try again some time'));
			});
	};

	function create(agent, next) {
			
		req.payload.createdAt = new Date();
		req.payload.agent = agent;

		Estates
			.insert(req.payload)
			.run()
			.then(function(result) {
				if (result.errors !== 0) {
					next(Boom.conflict('Probably this estate already exist'));
				} else {
					next(null, req.payload);
				}
			}).error(function(err) {
				next(Boom.badRequest('Something bad happen :('));
			});
	}

	Async.waterfall([
		checkAgent,
		checkLocation,
		create
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleEstate;
