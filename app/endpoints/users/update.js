var DB      = require('../../config/settings').db;
var r       = require('rethinkdbdash')(DB);
var Boom    = require('boom');
var Joi     = require('joi');
var bcrypt  = require('bcrypt');

/*------------------------------------*\
	[USERS] CREATE
\*------------------------------------*/

var updateUser = {
	method: ['PUT', 'PATCH'],
	path: '/users/{UCMID}',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [USERS]
		 */
		var T_USERS = r.table('users');

		if (req.payload.oldPassword && req.payload.password) {
			T_USERS
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

										updateUserFn();
									});
								});	
							} else {
								reply(Boom.badRequest('Sorry, The oldPassword are wrong'));
							}
						});
					} else {
						reply(Boom.badRequest('Something bad happen :('));
					}
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});

		} else if (req.payload.oldPassword || req.payload.password) {
			reply(Boom.badRequest('Sorry, Update password need of the both properties (oldPassword and password)'));
		} else {
			updateUserFn();
		}

		function updateUserFn() {
			T_USERS
				.get(req.params.UCMID)
				.update(req.payload)
				.run()
				.then(function(result) {
					if (result.replaced === 0) {
						reply(Boom.badRequest('Something bad happen :('));
					} else {
						reply({
							message: 'The user was updated'
						});
					}
					
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});
		}
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				firstName: Joi.string(),
				lastName: Joi.string(),
				email: Joi.string().email(),
				phones: Joi.object({
					cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/),
					homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/)
				}),
				password: Joi.string(),
				oldPassword: Joi.string()
			}
		}
	}
}

module.exports = updateUser;