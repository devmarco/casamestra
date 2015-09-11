/* ------------------------------------ *\
	[FAVORITES] REMOVE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi 		= require('joi');
const Async   	= require('async');
const Users 	= require('../../config/tables').users;

const removeFavorite = (req, reply) => {
	function checkFavorite(next) {
		Users
			.get(req.payload.ucmid)('favorites')
			.offsetsOf(Users.r.row('ecmid').eq(req.params.ecmid))
			.run()
			.then(result => {
				if (result.length) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This estate wasn`t favorited'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	function remove(index, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				favorites: Users.r.row('favorites').deleteAt(index[0]),
			})
			.run()
			.then(result => {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Favorite was removed',
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	Async.waterfall([
		checkFavorite,
		remove,
	], (err, result) => {
		reply(result || err);
	});
};

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
