/*------------------------------------*\
	[FAVORITES] REMOVE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Estates = require('../../config/tables').estates;

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

function removeFavorite(req, reply) {

	var favoriteIndex;

	(function checkEstate() {

		Estates
			.get(req.payload.ECMID)('favorites')
			.run()
			.then(function(result) {
				var i = 0;

				for (i; i < result.length; i++) {
					if (result[i].UCMID === req.payload.UCMID) {
						favoriteIndex = i;
						break;
					}
				}

				if (!favoriteIndex) {
					reply(Boom.badRequest('Sorry, It was not favorited by this user!'));
				} else {
					remove(favoriteIndex);
				}				

			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			})
	}());

	function remove(favoriteIndex) {
		Estates
			.get(req.payload.ECMID)
			.update({
				favorites: Estates.r.row('favorites').deleteAt(favoriteIndex)
			})
			.run()
			.then(function(result) {
				reply({
					message: 'Favorite was removed'
				});
			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};
}

module.exports = handleDelete;