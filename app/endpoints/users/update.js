/*------------------------------------*\
	[USERS] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var bcrypt	= require('bcrypt');
var Async   = require('async');
var Users 	= require('../../config/tables').users;
var Schema 	= require('../../models/user');

var handleUpdate = {
	method: ['PUT', 'PATCH'],
	path: '/users/{UCMID}',
	handler: updateUser,
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

function updateUser(req, reply) {

	function checkPassword(next) {
		if (req.payload.oldPassword && req.payload.password) {
			Users
				.get(req.params.UCMID)
				.run()
				.then(function(result) {
					if (result) {
						bcrypt.compare(req.payload.oldPassword, result.password, function(err, res) {
							if (res) {
								bcrypt.genSalt(15, function(err, salt) {
									bcrypt.hash(req.payload.password, salt, function(err, hash) {

										//Set the new password
										req.payload.password = hash;

										next();
									});
								});	
							} else {
								next(Boom.badRequest('Sorry, The oldPassword are wrong'));
							}
						});
					} else {
						next(Boom.badRequest('Something bad happen :('));
					}
				}).error(function(err) {
					next(Boom.badRequest('Something bad happen :('));
				});

		} else if (req.payload.oldPassword || req.payload.password) {
			next(Boom.badRequest('Sorry, Update password need of the both properties (oldPassword and password)'));
		} else {
			next();
		}
	}

	function update(next) {
		Users
			.get(req.params.UCMID)
			.update(req.payload)
			.run()
			.then(function(result) {
				if (result.replaced === 0) {
					next(Boom.badRequest('Something bad happen :('));
				} else {
					next(null, {
						status: 'success',
						message: 'The user was updated'
					});
				}
				
			}).error(function(err) {
				next(Boom.badRequest('Something bad happen :('));
			});
	}

	Async.waterfall([
		checkPassword,
		update
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleUpdate;