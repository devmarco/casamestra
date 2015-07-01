/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Estates = require('../../config/tables').estates;
var Users 	= require('../../config/tables').users;

var handleCreate = {
	method: 'POST',
	path: '/recommend/{ecmid}',
	handler: createRecommendation,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				ucmid: Joi.string().required()
			}
		}
	}
}

function createRecommendation(req, reply) {

	function checkEstate(next) {

		Estates
			.get(req.params.ecmid)
			.pluck('ecmid')
			.run()
			.then(function(result) {
				next(null, result);
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	function checkRecommendation(estate, next) {

		Users
			.get(req.payload.ucmid)('suggestions')
			.filter(function(suggestions) {
				return suggestions('ecmid').eq(req.params.ecmid);
			})
			.run()
			.then(function(result) {
				console.log(result);
				if (!result.length) {
					next(null, estate);
				} else {
					next(Boom.badRequest('Sorry, This estate already was recommended for this user'));
				}
			}).error(function(err) {
				console.log(err);
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	function create(estate, next) {

		Users
			.get(req.payload.ucmid)
			.update({
				suggestions: Users.r.row('suggestions').append(estate)
			})
			.run()
			.then(function(result) {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Estate recommended'
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	Async.waterfall([
		checkEstate,
		checkRecommendation,
		create
	], function(err, result) {
		reply(result || err);
	});
} 

module.exports = handleCreate;
