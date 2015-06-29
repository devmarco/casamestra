/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var Boom 		= require('boom');
var Joi 		= require('joi');
var Async   	= require('async');
var Estates 	= require('../../config/tables').estates;
var Users 		= require('../../config/tables').users;

var handleCreate = {
	method: 'POST',
	path: '/favorites',
	handler: createFavorite,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				ECMID: Joi.string().required(),
				UCMID: Joi.string().required()
			}
		}
	}
}

function createFavorite(req, reply) {

	var userID 		= req.payload.UCMID,
		estateID	= req.payload.ECMID;

	function checkUser(next) {

		Users
			.get(userID)
			.without('password')
			.run()
			.then(function(result) {
				next(null, result);
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	function checkEstate(user, next) {

		Estates
			.get(estateID)
			.run()
			.then(function(result) {
				var i = 0;

				if (result) {
					//Check if the estate have some favorites
					if (result.favorites && result.favorites.length > 0) {
						for (i; i < result.favorites.length; i++) {
							if (result.favorites[i].UCMID === userID) {
								next(Boom.conflict('Sorry, The user already favorited this estate!'));
								break;
							}
						}
						next(null, user);
					} else {
						next(null, user);
					}
				} else {
					next(Boom.badRequest('Sorry, This estate not exist'));
				}
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	function create(user, next) {

		Estates
			.get(estateID)
			.update({
				favorites: Estates.r.row('favorites').default([]).append(result)
			})
			.run()
			.then(function(result) {
				next(null, {
					status: 'success',
					message: 'Estate favorited'
				});
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	Async.waterfall([
		checkUser,
		checkEstate,
		create
	], function(err, result) {
		reply(result || err);
	});
} 

module.exports = handleCreate;
