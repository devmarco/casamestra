var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var createFavorite = {
	method: 'POST',
	path: '/favorites',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ESTATES]
		 * Table: [USERS]
		 */
		T_ESTATES = r.table('estates');
		T_USERS = r.table('users');

		checkEstate();

		function checkEstate() {

			var userID = req.payload.UCMID,
				estateID = req.payload.ECMID;

			//Check if the estate exist
			T_ESTATES
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
		}

		function createFavorite() {
			//Check if the user exist
			T_USERS
				.get(userID)
				.without('password')
				.run()
				.then(function(result) {
					//Create the favorite
					T_ESTATES
						.get(estateID)
						.update({
							favorites: r.row('favorites').default([]).append(result)
						})
						.run()
						.then(function(result) {
							reply({
								message: 'Estate favorited'
							});
						}).error(function(err) {
							reply(Boom.badRequest('Sorry, Something are wrong!'));
						});
				}).error(function(err) {
					reply(Boom.badRequest('Sorry, Something are wrong!'));
				});
		}

	},
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

module.exports = createFavorite;
