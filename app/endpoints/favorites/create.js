/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var Boom 		= require('boom');
var Joi 		= require('joi');
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

/*
 * Favorite an Estate
 */
function createFavorite(req, reply) {

	var userID 		= req.payload.UCMID,
		estateID	= req.payload.ECMID;

	/*
	 * Check if the Estate exist before create the favorite
	 * Check if the Estate already have a favorite of the same user
	 */
	(function checkEstate() {
		//Check if the estate exist
		Estates
			.get(estateID)
			.run()
			.then(function(result) {
				var i = 0,
					hasFavorite = false;

				if (result) {
					//Check if the estate have some favorites
					if (result.favorites && result.favorites.length > 0) {
						for (i; i < result.favorites.length; i++) {
							if (result.favorites[i].UCMID === userID) {
								hasFavorite = true;
								break;
							}
						}
						if (!hasFavorite) {
							createFavorite();
						} else {
							reply(Boom.conflict('Sorry, The user already favorited this estate!'));
						}
					} else {
						createFavorite();
					}
				} else {
					reply(Boom.badRequest('Sorry, This estate not exist'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}());

	function createFavorite() {
		//Check if the user exist
		Users
			.get(userID)
			.without('password')
			.run()
			.then(function(result) {
				//Create the favorite
				Estates
					.get(estateID)
					.update({
						favorites: Users.r.row('favorites').default([]).append(result)
					})
					.run()
					.then(function(result) {
						reply({
							status: 'success',
							message: 'Estate favorited'
						});
					}).error(function(err) {
						reply(Boom.badRequest('Sorry, Something are wrong!'));
					});
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}
} 

module.exports = handleCreate;
