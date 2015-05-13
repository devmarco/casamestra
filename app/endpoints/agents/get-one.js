var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[AGENTS] GET ONE
\*------------------------------------*/

var getOneAgent = {
	method: 'GET',
	path: '/agents/{CRECI}',
	handler: function(req, reply) {
		r.table('agents')
			.get(parseInt(req.params.CRECI))
			.run()
			.then(function(result) {
				if (result) {
					reply(result);
				} else {
					reply(Boom.notFound('Sorry, this agent not exist'));
				}
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}
}

module.exports = getOneAgent;