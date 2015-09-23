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

let errorArray;
let successArray;
let	currentEstate;

function checkAgent(next) {
	Agents
		.get(currentEstate.agent)
		.run()
		.then(result => {
			if (result) {
				next(null, result);
			} else {
				next('Sorry, This agent not exist');
			}
		}).error(() => next('Try again some time'));
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
		}).error(() => next('Try again some time'));
}

function isSuccess(agent) {
	currentEstate.createdAt = new Date();
	currentEstate.agent = agent;
	successArray.push(currentEstate);
}

function isError(err) {
	errorArray.push({
		message: err,
		value: currentEstate,
	});
}

function create(reply) {
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

const createEstate = (req, reply) => {
	const estates = req.payload;
	const length = estates.length;

	errorArray = [];
	successArray = [];

	const check = (estateIndex) => {
		let index = estateIndex;

		if (index >= length) {
			create(reply);
			return false;
		}

		currentEstate = estates[index];

		Joi.validate(currentEstate, Schema, {
			presence: 'required',
		}, (errSchema) => {
			if (index < length) {
				if (!errSchema) {
					Async.waterfall([
						checkAgent,
						checkLocation,
					], (err, agent) => {
						if (agent) {
							isSuccess(agent);
						} else {
							isError(err);
						}

						check(++index);
					});
				} else {
					isError(errSchema);
					check(++index);
				}
			} else {
				create();
			}
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
