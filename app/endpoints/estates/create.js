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

		if (!req.payload.acmid) return next();

		Agents
			.get(req.payload.acmid)	
			.run()
			.then(function(result) {
				
				if (result) req.payload.acmid = result;

				next();

			}).error(function(err) {
				next(Boom.forbidden('Something are wrong if the agent'));
			});
	};

	function checkUser(next) {

		if (!req.payload.ucmid) return next();

		Users
			.get(req.payload.ucmid)
			.without('password')	
			.run()
			.then(function(result) {
				if (result) req.payload.ucmid = result;

				next();

			}).error(function(err) {
				next(Boom.forbidden('Something are wrong if the user'));
			});
	};

	function checkLocation(next) {

		//Estate must associated to an user or an agent
		if (!req.payload.acmid && !req.payload.ucmid) {
			next(Boom.forbidden('Sorry, Estate must be associated to an user or an agent'));
			return false;
		};

		Estates
			.filter({
				location: req.payload.location
			})
			.run()
			.then(function(result) {
				if (result.length === 0) {
					req.payload.createdAt = new Date();
					next();
				} else {
					next(Boom.conflict('Already exist an estate with the same address'));
				}
			})
			.error(function(err) {
				next(Boom.badRequest('Try again some time'));
			});
	};

	function create(next) {
		
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
		checkUser,
		checkLocation,
		create
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleEstate;
