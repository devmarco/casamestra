var Boom 	= require('boom');
var Joi 	= require('joi');
var Estates = require('../../config/tables').agents;

/*------------------------------------*\
	[FAVORITES] REMOVE
\*------------------------------------*/

var handleDelete = {
	method: 'DELETE',
	path: '/favorites',
	handler: removeFavorite,
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
 * Remove a favorite
 */
function removeFavorite(req, reply) {
	Estates
		.get(req.payload.ECMID)('favorites')
		.run()
		.then(function(result) {
			var i = 0,
				resultIndex = false;

			for (i; i < result.length; i++) {
				if (result[i].UCMID === req.payload.UCMID) {
					resultIndex = i;
					break;
				}
			}

			if (resultIndex !== false) {
				Estates
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
						console.log('Error');
						reply(Boom.badRequest('Sorry, Something are wrong!'));
					});
			} else {
				reply(Boom.badRequest('Sorry, It was not favorited by this user!'));
			}

		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		})
}

module.exports = handleDelete;