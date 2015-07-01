/*------------------------------------*\
	[FAVORITES] REMOVE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Users 	= require('../../config/tables').users;

var handleDelete = {
	method: 'DELETE',
	path: '/recommend/{ecmid}',
	handler: removeFavorite,
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

function removeFavorite(req, reply) {

	function checkRecommendation(next) {

		Users
			.get(req.payload.ucmid)('suggestions')
			.offsetsOf(Users.r.row('ecmid').eq(req.params.ecmid))
			.run()
			.then(function(result) {
				if (result.length) {
					next(null, result);
				} else {
					next(Boom.badRequest('Sorry, This estate wasn`t recommended'));
				}
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	}

	function remove(index, next) {

		Users
			.get(req.payload.ucmid)
			.update({
				suggestions: Users.r.row('suggestions').deleteAt(index[0])
			})
			.run()
			.then(function(result) {
				if (result.replaced) {
					next(null, {
						status: 'success',
						message: 'Recommendation was removed'
					});
				} else {
					next(Boom.badRequest('Sorry, Try again'));
				}
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	Async.waterfall([
		checkRecommendation,
		remove
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleDelete;