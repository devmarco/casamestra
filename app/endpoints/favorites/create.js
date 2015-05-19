var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[FAVORITES] CREATE
\*------------------------------------*/

var createFavorite = {
	method: 'POST',
	path: '/favorites',
	handler: function(req, reply) {

		//Verify if the user really exist
		r.table('users')
			.get(req.payload.UCMID)
			.without('password')
			.run()
			.then(function(user) {
				
				//Verify if the estate really exist
				r.table('estates')
					.get(req.payload.ECMID)('favorites')
					.contains(req.payload.UCMID)
					.run()
					.then(function(result) {
						if (result) {
							reply(Boom.conflict('This estate already was favorited by the user'));
						} else {

							r.table('estates')
								.get(req.payload.ECMID)
								.update({
									favorites: r.row('favorites').default([]).append(req.payload.UCMID)
								})
								.run()
								.then(function(result) {
									reply({
										message: 'Estate favorited'
									});
								}).error(function(err) {
									reply(Boom.badRequest('Sorry, Something are wrong!'));
								});
						}
			
					}).error(function(err) {
						reply(Boom.badRequest('Sorry, Something are wrong!'));
					});

			}).error(function(err) {
				reply(Boom.badRequest('Sorry, Something are wrong!'));
			});
	},
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

module.exports = createFavorite;
