var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var getAgents = {
	method: 'GET',
	path: '/agents',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [AGENTS]
		 */
		var T_AGENTS = r.table('agents');

		get();

		function get() {
			T_AGENTS
				.run()
				.then(function(result) {
					reply(result);
				}).error(function(err) {
					reply(Boom.badRequest('Try again some time'));
				});
		}
	}
}

module.exports = getAgents;