var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[ESTATES] CREATE
\*------------------------------------*/

var createEstate = {
	method: 'POST',
	path: '/estates/{CMID}/favorites',
	handler: function(req, reply) {

		//[ATENTION] Add userID verification

		r.table('estates')
			.get(req.params.CMID)
			.update({ 
				favorites: r.row("favorites").default([]).append(req.payload.userID) 
			})
			.run()
			.then(function(result) {

				if (result.skipped !== 0) {
					reply(Boom.notFound('Sorry, this estate not exist'));
				} else {
					reply({
						message: 'Favorite added'
					});
				}
				
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				userID: Joi.string().required(),
			}
		}
	}
}

module.exports = createEstate;
