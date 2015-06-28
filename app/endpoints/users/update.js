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
				abortEarly: false
			},
			payload: Schema
		}
	}
}

function updateUser(req, reply) {

	function checkPassword(next) {
		if (req.payload.currentPassword && req.payload.password) {
			Users
				.get(req.params.UCMID)
				.run()
				.then(function(result) {
					if (result) {
						bcrypt.compare(req.payload.currentPassword, result.password, function(err, res) {
							if (res) {
								bcrypt.genSalt(15, function(err, salt) {
									bcrypt.hash(req.payload.password, salt, function(err, hash) {

										//Set the new password
										req.payload.password = hash;

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
				}).error(function(err) {
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