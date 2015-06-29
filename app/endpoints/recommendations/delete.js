/*------------------------------------*\
	[FAVORITES] REMOVE
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Async   = require('async');
var Estates = require('../../config/tables').estates;

var handleDelete = {
	method: 'DELETE',
	path: '/recommend',
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

	var recommendationIndex;

	function checkEstate(next) {

		Estates
			.get(req.payload.ECMID)('recommendations')
			.run()
			.then(function(result) {
				var i = 0;

				for (i; i < result.length; i++) {
					if (result[i].UCMID === req.payload.UCMID) {
						recommendationIndex = i;
						break;
					}
				}

				if (!recommendationIndex) {
					next(Boom.badRequest('Sorry, This estate not was recommended for this user'));
				} else {
					next(null, recommendationIndex);
				}				

			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			})
	};

	function remove(recommendationIndex, next) {
		Estates
			.get(req.payload.ECMID)
			.update({
				recommendations: Estates.r.row('recommendations').deleteAt(recommendationIndex)
			})
			.run()
			.then(function(result) {
				next(null, {
					status: 'success',
					message: 'Recommendation was removed'
				});
			}).error(function(err) {
				next(Boom.badRequest('Sorry, Something are wrong!'));
			});
	};

	Async.waterfall([
		checkUser,
		remove
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleDelete;