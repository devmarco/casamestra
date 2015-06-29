/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var Boom 		= require('boom');
var Joi 		= require('joi');
var Async   	= require('async');
var Estates 	= require('../../config/tables').estates;
var Users 		= require('../../config/tables').users;

var handleCreate = {
	method: 'POST',
	path: '/recommend',
	handler: createRecommendation,
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

function createRecommendation(req, reply) {

	var userID 		= req.payload.UCMID,
		estateID	= req.payload.ECMID;

	function checkUser(next) {

		Users
			.get(userID)
			.without('password')
			.run()
			.then(function(result) {
				next(null, result);
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	function checkRecommendation(user, next) {
		var i = 0;

		Estates
			.get(estateID)
			.run()
			.then(function(result) {
				var recm;

				if (result) {
					if (result.recommendations && result.recommendations.length) {

						recm = result.recommendations;

						for (i; i < recm.length; i++) {
							if (recm[i].UCMID === req.payload.UCMID) {
								next(Boom.badRequest('This estate already was recommended for this user'));
								break;
							}
						}

						next(null, user);
					} else {
						next(null, user);
					}
				} else {
					next(Boom.badRequest('Sorry, This estate not exist!'));
				}

			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function create(user, next) {

		Estates
			.get(estateID)
			.update({
				recommendations: Estates.r.row('recommendations').default([]).append(user)
			})
			.run()
			.then(function(result) {

				if (result.replaced !== 0) {
					next(null, {
						status: 'success',
						message: 'Recommendation added'
					});
				} else {
					next(Boom.badRequest('Sorry, Something are wrong!'));
				}
				
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	Async.waterfall([
		checkUser,
		checkRecommendation,
		create
	], function(err, result) {
		reply(result || err);
	});
} 

module.exports = handleCreate;
