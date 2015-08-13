/* ------------------------------------ *\
	[FAVORITES] CREATE
\* ------------------------------------ */

var Boom 		= require('boom');
var Joi 		= require('joi');
var Async   	= require('async');
var Estates 	= require('../../config/tables').estates;
var Users 		= require('../../config/tables').users;

function createFavorite(req, reply) {
	function checkEstate(next) {
		Estates
			.get(req.params.ecmid)
			.pluck('ecmid')
			.run()
			.then(function then(result) {
				next(null, result);
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function checkFavorite(estate, next) {
		Users
			.get(req.payload.ucmid)('favorites')
			.filter(function filter(favorites) {
				return favorites('ecmid').eq(estate.ecmid);
			})
			.run()
			.then(function then(result) {
				if (result.length === 0) {
					next(null, estate);
				} else {
					next(Boom.badRequest('Sorry, This estate already was favorited by this user'));
				}
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function create(estate, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				favorites: Users.r.row('favorites').append(estate),
			})
			.run()
			.then(function then(result) {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Estate favorited',
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	Async.waterfall([
		checkEstate,
		checkFavorite,
		create,
	], function reply(err, result) {
		reply(result || err);
	});
}

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
