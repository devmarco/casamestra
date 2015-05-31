var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------ *\
	[NEIGHBORHOODS] CREATE
\*------------------------------------*/

var createNeighborhoods = {
	method: 'POST',
	path: '/neighborhoods',
	handler: function(req, reply) {
		r.table('neighborhoods')
			.insert(req.payload, {
				conflict: 'error'
			})
			.run()
			.then(function(result) {
				if (result.errors !== 0) {
					reply(Boom.conflict('Probably this neighborhood already exist'));
				} else {
					reply(req.payload);
				}
				
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				city: Joi.string().required(),
				name: Joi.string().required(),
				title: Joi.string().required(),
				description: Joi.string().required(),
				cover: Joi.string().required(),
				tags: Joi.array().required(),
				about: Joi.object({
					neighbors: Joi.string().required(),
					expect: Joi.string().required(),
					lifestyle: Joi.string().required(),
					notexpect: Joi.string().required(),
					market: Joi.string().required(),
					love: Joi.string().required()
				}).required(),
				address: Joi.object({
					local: Joi.string().required(),
					lat: Joi.number().required(),
					lng: Joi.number().required()
				}).required(),
				commutetimes: Joi.array().items({
					destination: Joi.string(),
					time: Joi.number()
				})
			}
		}
	}
}

module.exports = createNeighborhoods;
