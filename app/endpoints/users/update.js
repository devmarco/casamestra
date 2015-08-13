/* ------------------------------------ *\
	[USERS] CREATE
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi 	= require('joi');
var bcrypt	= require('bcrypt');
var Async   = require('async');
var Users 	= require('../../config/tables').users;
var Schema 	= require('../../models/user');

function updateUser(req, reply) {
	function checkPassword(next) {
		if (req.payload.currentPassword && req.payload.password) {
			Users
				.get(req.params.ucmid)
				.run()
				.then(function then(result) {
					if (result) {
						bcrypt.compare(req.payload.currentPassword, result.password, function compare(err, res) {
							if (res) {
								bcrypt.genSalt(15, function generate(err, salt) {
									bcrypt.hash(req.payload.password, salt, function create(err, hash) {
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
				}).error(function error(err) {
					next(Boom.badRequest('Something bad happen :('));
				});
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
			}).error(function error(err) {
				next(Boom.badRequest('Something bad happen :('));
			});
	}

	Async.waterfall([
		checkPassword,
		update,
	], function reply(err, result) {
		reply(result || err);
	});
}

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
