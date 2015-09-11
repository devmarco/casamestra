/* ------------------------------------ *\
	[USERS] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const bcrypt	= require('bcrypt');
const Async   	= require('async');
const Users 	= require('../../config/tables').users;
const Schema 	= require('../../models/user');

const updateUser = (req, reply) => {
	function checkPassword(next) {
		if (req.payload.currentPassword && req.payload.password) {
			Users
				.get(req.params.ucmid)
				.run()
				.then(function then(result) {
					if (result) {
						bcrypt.compare(req.payload.currentPassword, result.password, function compare(errCompare, res) {
							if (res) {
								bcrypt.genSalt(15, (errSalt, salt) => {
									if (errSalt) return next(Boom.badRequest('Something bad happen :('));

									bcrypt.hash(req.payload.password, salt, (err, hash) => {
										// Set the new password
										req.payload.password = hash;

										// Delete the currentPassword
										delete req.payload.currentPassword;

										next();
									});
								});
							} else {
								next(Boom.badRequest('Sorry, The currentPassword are wrong'));
							}
						});
					} else {
						next(Boom.badRequest('Something bad happen :('));
					}
				}).error(() => next(Boom.badRequest('Something bad happen :(')));
		} else if (req.payload.currentPassword || req.payload.password) {
			next(Boom.badRequest('Sorry, Update password need of the both properties (currentPassword and password)'));
		} else {
			next();
		}
	}

	function update(next) {
		Users
			.get(req.params.ucmid)
			.update(req.payload)
			.run()
			.then(function then(result) {
				if (result.replaced === 0) {
					next(Boom.badRequest('Something bad happen :('));
				} else {
					next(null, {
						status: 'success',
						message: 'The user was updated',
					});
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		checkPassword,
		update,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: ['PUT', 'PATCH'],
	path: '/users/{ucmid}',
	handler: updateUser,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: Schema,
		},
	},
};
