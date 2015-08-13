/* ------------------------------------ *\
	[FAVORITES] CREATE
\* ------------------------------------ */

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

function createRecommendation(req, reply) {
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

	function checkRecommendation(estate, next) {
		Users
			.get(req.payload.ucmid)('suggestions')
			.filter(function filter(suggestions) {
				return suggestions('ecmid').eq(req.params.ecmid);
			})
			.run()
			.then(function then(result) {
				if (!result.length) {
					next(null, estate);
				} else {
					next(Boom.badRequest('Sorry, This estate already was recommended for this user'));
				}
			}).error(function error(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function create(estate, next) {
		Users
			.get(req.payload.ucmid)
			.update({
				suggestions: Users.r.row('suggestions').append(estate),
			})
			.run()
			.then(function then(result) {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Estate recommended',
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
		checkRecommendation,
		create,
	], function reply(err, result) {
		reply(result || err);
	});
}

module.exports = {
	method: 'POST',
	path: '/recommend/{ecmid}',
	handler: createRecommendation,
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
