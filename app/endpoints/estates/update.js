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
	path: '/estates/{ecmid}',
	handler: updateEstate,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: Schema
		}
	}
}

function updateEstate(req, reply) {

	function checkAgent(next) {

		if (!req.payload.agent) return next(null, '');

		Agents
			.get(req.payload.agent)	
			.run()
			.then(function(result) {
				if (result) {
					next(null, result);
				} else {
					next(Boom.notFound('Sorry, this agent not exist'));
				} 
			}).error(function(err) {
				next(Boom.forbidden('Try again some time'));
			});
	};

	function update(agent, next) {

		if (agent) req.payload.agent = agent;
		
		req.payload.updatedAt = new Date();

		Estates
			.get(req.params.ecmid)
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
		update
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleUpdate;