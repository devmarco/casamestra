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
	path: '/estates/import',
	handler: createEstate,
	config: {
		validate: {
			options: {
				abortEarly: false
			}
		}
	}
}

function createEstate(req, reply) {

	var estates 		= req.payload,
		errorImports 	= [],
		successImports	= [],
		estateIndex 	= 0,
		currentEstate;

	if (!estates.length) reply(Boom.badRequest('Sorry, you need pass an Array of json objects'));

	function checkAgent(next) {

		Agents
			.get(currentEstate.agent)
			.run()
			.then(function(result) {
				if (result) {
					next(null, result);
				} else {
					next('Sorry, This agent not exist');
				}
			})
			.error(function(err) {
				next('Try again some time');
			});
	}

	function checkLocation(agent, next) {

		Estates
			.filter(Estates.r.row('location').eq(currentEstate.location))
			.run()
			.then(function(result) {
				if (result.length === 0) {
					next(null, agent);
				} else {
					next('Already exist an estate with the same address');
				}
			})
			.error(function(err) {
				next('Try again some time');
			});
	};

	function create() {

		Estates
			.insert(successImports)
			.run()
			.then(function(result) {
				reply({
					status: 'Finished',
					inserted: result.inserted,
					skipped: result.skipped,
					replaced: result.replaced,
					insertErros: result.errors,
					invalid: errorImports.length,
					invalidValues: errorImports
				});
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	}

	function pushError(err, value) {
		errorImports.push({
			message: err,
			value: currentEstate
		});
	}

	function pushSuccess(value) {
		successImports.push(value);
	}

	function validateEstate(next) {

		currentEstate = req.payload[estateIndex];

		estateIndex++;

		if (estateIndex <= (req.payload.length)) {
			Joi.validate(currentEstate, Schema, {
				presence: 'required'
			}, function (err, value) {

				if (err) {
					pushError(err);
					validateEstate();
				} else {

					Async.waterfall([
						checkAgent,
						checkLocation
					], function(err, agent) {
						if (agent) {
		
							currentEstate.createdAt = new Date();
							currentEstate.agent = agent;

							pushSuccess(currentEstate);

						} else if (err) {
							pushError(err);
						}
						
						validateEstate();
					});
				}
			});
		} else {
			create();
		}
	};

	validateEstate();
}

module.exports = handleEstate;
