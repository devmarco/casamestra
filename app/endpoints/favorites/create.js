/* ------------------------------------ *\
	[FAVORITES] CREATE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi 		= require('joi');
const Async   	= require('async');
const Estates 	= require('../../config/tables').estates;
const Users 	= require('../../config/tables').users;

const createFavorite = (req, reply) => {
	function checkEstate(next) {
		Estates
			.get(req.params.ecmid)
			.pluck('ecmid')
			.run()
			.then(function then(result) {
				next(null, result);
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	function checkFavorite(estate, next) {
		Users
			.get(req.payload.ucmid)('favorites')
			.filter(favorites => {
				return favorites('ecmid').eq(estate.ecmid);
			})
			.run()
			.then(result => {
				if (result.length === 0) {
					next(null, estate);
				} else {
					next(Boom.badRequest('Sorry, This estate already was favorited by this user'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	function create(estate, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				favorites: Users.r.row('favorites').append(estate),
			})
			.run()
			.then(result => {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Estate favorited',
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	Async.waterfall([
		checkEstate,
		checkFavorite,
		create,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'POST',
	path: '/favorites/{ecmid}',
	handler: createFavorite,
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
