var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[FAVORITES] REMOVE
\*------------------------------------*/

var deleteFavorites = {
	method: 'DELETE',
	path: '/favorites',
	handler: function(req, reply) {
		r.table('estates')
			.get(req.payload.ECMID)('favorites')
			.run()
			.then(function(result) {
				var i = 0,
					resultIndex = false;

				if (result) {
					for (i; i < result.length; i++) {
						if (result[i] === req.payload.UCMID) {
							resultIndex = i;
							break;
						}
					}

					if (resultIndex !== false) {
						r.table('estates')
							.get(req.payload.ECMID)
							.update({
								favorites: r.row('favorites').deleteAt(resultIndex)
							})
							.run()
							.then(function(result) {
								reply({
									message: 'Favorite was removed'
								});
							}).error(function(err) {
								reply(Boom.badRequest('Sorry, Something are wrong!'));
							});
					} else {
						reply(Boom.badRequest('Sorry, It was not favorited by the user!'));
					}
				} else {
					reply(Boom.badRequest('Sorry, Something are wrong!'));
				}

			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			})
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

module.exports = deleteFavorites;