/*------------------------------------*\
	[ESTATE] UPDATE
\*------------------------------------*/

var Boom    = require('boom');
var Joi     = require('joi');
var Async   = require('async');
var Estates = require('../../config/tables').estates;
var Agents 	= require('../../config/tables').agents;
var Users 	= require('../../config/tables').users;
var Schema 	= require('../../models/estate');

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/estates/{ECMID}',
	handler: updateEstate,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'optional'
			},
			payload: Schema
		}
	}
}

function updateEstate(req, reply) {

	function checkAgent(next) {

		if (!req.payload.ACMID) return next();

		Agents
			.get(req.payload.ACMID)	
			.run()
			.then(function(result) {
				if (!result) {
					next(Boom.notFound('Sorry, this agent not exist'));
				} 
			}).error(function(err) {
				next(Boom.forbidden('Try again some time'));
			});
	};

	function checkUser(next) {

		if (!req.payload.UCMID) return next();

		Users
			.get(req.payload.UCMID)	
			.run()
			.then(function(result) {
				if (!result) {
					next(Boom.notFound('Sorry, this user not exist'));
				} 
			}).error(function(err) {
				next(Boom.forbidden('Try again some time'));
			});
	};

	function update(next) {

		req.payload.updatedAt = new Date();

		Estates
			.get(req.params.ECMID)
			.update(req.payload)
			.run()
			.then(function(result) {
				if (result.replaced === 0) {
					next(Boom.badRequest('Something bad happen :('));
				} else {
					next(null, {
						status: 'success',
						message: 'The estate was updated'
					});
				}
				
			}).error(function(err) {
				next(Boom.badRequest('Something bad happen :('));
			});
	};

	Async.waterfall([
		checkAgent,
		checkUser,
		update
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleUpdate;