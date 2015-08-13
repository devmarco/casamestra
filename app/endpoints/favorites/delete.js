/* ------------------------------------ *\
	[FAVORITES] REMOVE
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Users 	= require('../../config/tables').users;

function removeFavorite(req, reply) {
	function checkFavorite(next) {
		Users
			.get(req.payload.ucmid)('favorites')
			.offsetsOf(Users.r.row('ecmid').eq(req.params.ecmid))
			.run()
			.then(function then(result) {
				if (result.length) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This estate wasn`t favorited'));
				}
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function remove(index, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				favorites: Users.r.row('favorites').deleteAt(index[0]),
			})
			.run()
			.then(function then(result) {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Favorite was removed',
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	Async.waterfall([
		checkFavorite,
		remove,
	], function reply(err, result) {
		reply(result || err);
	});
}

module.exports = {
	method: 'DELETE',
	path: '/favorites/{ecmid}',
	handler: removeFavorite,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: {
				ucmid: Joi.string().required(),
			},
		},
	},
};
