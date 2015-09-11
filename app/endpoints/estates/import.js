/* ------------------------------------ *\
	[ESTATES] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi 		= require('joi');
const Async   	= require('async');
const Estates 	= require('../../config/tables').estates;
const Agents 	= require('../../config/tables').agents;
const Schema 	= require('../../models/estate');

const 	errorArray 		= [];
const 	successArray 	= [];
let		currentEstate;

function checkAgent(next) {
	Agents
		.get(currentEstate.acmid)
		.run()
		.then(result => {
			if (result) {
				next(null, result);
			} else {
				next('Sorry, This agent not exist');
			}
		})
		.error(() => next('Try again some time'));
}

function checkLocation(agent, next) {
	Estates
		.filter(Estates.r.row('location').eq(currentEstate.location))
		.run()
		.then(result => {
			if (result.length === 0) {
				next(null, agent);
			} else {
				next('Already exist an estate with the same address');
			}
		})
		.error(() => next('Try again some time'));
}

function isSuccess(agent) {
	currentEstate.createdAt = new Date();
	currentEstate.agent = agent;
	successArray.push(currentEstate);
}

function isError(err, value) {
	errorArray.push({
		message: err,
		value: value,
	});
}

function checkEstate() {
	Async.waterfall([
		checkAgent,
		checkLocation,
	], (err, agent) => {
		(agent) ? isSuccess(agent) : isError(err);
	});
}

const createEstate = (req, reply) => {
	const estates = req.payload;
	const length = estates.length;

	if (!req.payload.length) {
		reply(Boom.badRequest('Sorry, you need pass an Array of json objects'));
		return false;
	}

	function create() {
		Estates
			.insert(successArray)
			.run()
			.then(result => {
				reply({
					status: 'Finished',
					inserted: result.inserted,
					skipped: result.skipped,
					replaced: result.replaced,
					insertErros: result.errors,
					invalid: errorArray.length,
					invalidValues: errorArray,
				});
			}).error(() => reply(Boom.badRequest('Something bad happen :(')));
	}

	const check = (estateIndex) => {
		let index = estateIndex;

		currentEstate = estates[estateIndex];

		Joi.validate(currentEstate, Schema, {
			presence: 'required',
		}, (err, value) => {
			(!err) ? checkEstate() : isError(err, value);
			(estateIndex <= length) ? check(++index) : create();
		});
	};

	check(0);
};

module.exports = {
	method: 'POST',
	path: '/estates/import',
	handler: createEstate,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
		},
	},
};
