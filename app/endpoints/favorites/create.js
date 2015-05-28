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

		var userID = req.payload.UCMID,
			estateID = req.payload.ECMID;

		//Check if the estate exist
		r.table('estates')
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
					
					function createFavorite() {
						//Check if the user exist
						r.table('users')
							.get(userID)
							.without('password')
							.run()
							.then(function(result) {
								//Create the favorite
								r.table('estates')
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
				} else {
					reply(Boom.badRequest('Sorry, This estate not exist'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});

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
