/* ------------------------------------ *\
	[FAVORITES] REMOVE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Joi 		= require('joi');
const Async   	= require('async');
const Users 	= require('../../config/tables').users;

const removeFavorite = (req, reply) => {
	function checkRecommendation(next) {
		Users
			.get(req.payload.ucmid)('suggestions')
			.offsetsOf(Users.r.row('ecmid').eq(req.params.ecmid))
			.run()
			.then(result => {
				if (result.length) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This estate wasn`t recommended'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	function remove(index, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				suggestions: Users.r.row('suggestions').deleteAt(index[0]),
			})
			.run()
			.then(result => {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Recommendation was removed',
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(() => next(Boom.badRequest('Sorry, Something are wrong!')));
	}

	Async.waterfall([
		checkRecommendation,
		remove,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'DELETE',
	path: '/recommend/{ecmid}',
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
