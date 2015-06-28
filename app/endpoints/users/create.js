/*------------------------------------*\
	[USERS] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var bcrypt	= require('bcrypt');
var Users 	= require('../../config/tables').users;
var Schema 	= require('../../models/user');

var handleCreate = {
	method: 'POST',
	path: '/users',
	handler: createUser,
	config: {
		validate: {
			options: {
				abortEarly: false,
				presence: 'required'
			},
			payload: Schema
		}
	}
}

function createUser(req, reply) {


	function encrypt(next) {

		bcrypt.genSalt(15, function(err, salt) {

			if (err) {
				return next(Boom.badRequest('Something bad happen :('));
			}
			
			bcrypt.hash(req.payload.password, salt, function(err, hash) {

				if (err) {
					return next(Boom.badRequest('Something bad happen :('));
				}

				req.payload.password = hash;

				next();
			});
		});
	}

	function create(next) {

		Users
			.insert(req.payload, {
				conflict: 'error'
			})
			.run()
			.then(function(result) {
				if (result.errors !== 0) {
					next(Boom.conflict('Probably this user already exist'));
				} else {
					next({
						status: 'success',
						message: 'Success'
					});
				}
				
			}).error(function(err) {
				next(Boom.badRequest('Something bad happen :('));
			});
	}

	Async.waterfall([
		encrypt,
		create
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleCreate;