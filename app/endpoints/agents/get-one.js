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

		/*
		 * Set the table
		 * Table: [AGENTS]
		 */
		var T_AGENTS = r.table('agents');

		get();

		function get() {
			T_AGENTS
				.get(parseInt(req.params.CRECI))
				.run()
				.then(function(result) {
					if (result) {
						reply(result);
					} else {
						reply(Boom.notFound('Sorry, this agent not exist'));
					}
				}).error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		}
	}
}

module.exports = getOneAgent;