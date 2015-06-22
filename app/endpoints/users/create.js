/*------------------------------------*\
	[USERS] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var bcrypt	= require('bcrypt');
var Users 	= require('../../config/tables').users;

var handleCreate = {
	method: 'POST',
	path: '/users',
	handler: createUser,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().email().required(),
				phones: Joi.object({
					cellphone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required(),
					homephone: Joi.string().regex(/^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [1-9][0-9]{3}-[0-9]{4})$/).required()
				}).required(),
				password: Joi.string().required()
			}
		}
	}
}

/*
 * Create an User
 */
function createUser(req, reply) {
	bcrypt.genSalt(15, function(err, salt) {
		bcrypt.hash(req.payload.password, salt, function(err, hash) {

			if (err) {
				return reply(Boom.badRequest('Something bad happen :('));
			}

			//Set the new password
			req.payload.password = hash;

			T_USERS
				.insert(req.payload, {
					conflict: 'error'
				})
				.run()
				.then(function(result) {
					if (result.errors !== 0) {
						reply(Boom.conflict('Probably this user already exist'));
					} else {
						reply({
							message: 'Success'
						});
					}
					
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});
		});
	});
}

module.exports = handleCreate;