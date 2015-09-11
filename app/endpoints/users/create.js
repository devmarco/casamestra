/* ------------------------------------ *\
	[USERS] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Async   	= require('async');
const bcrypt	= require('bcrypt');
const Users 	= require('../../config/tables').users;
const Schema 	= require('../../models/user');

const createUser = (req, reply) => {
	function encrypt(next) {
		bcrypt.genSalt(15, (saltErr, salt) => {
			if (saltErr) return next(Boom.badRequest('Something bad happen :('));

			bcrypt.hash(req.payload.password, salt, (err, hash) => {
				if (err) return next(Boom.badRequest('Something bad happen :('));

				req.payload.password = hash;

				next();
			});
		});
	}

	function create(next) {
		req.payload.favorites 	= [];
		req.payload.suggestions = [];

		Users
			.insert(req.payload, {
				conflict: 'error',
			})
			.run()
			.then(result => {
				if (result.errors !== 0) {
					next(Boom.conflict('Probably this user already exist'));
				} else {
					next({
						status: 'success',
						message: 'User created',
					});
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		encrypt,
		create,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'POST',
	path: '/users',
	handler: createUser,
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
