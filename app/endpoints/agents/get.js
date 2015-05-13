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
		r.table('agents')
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}
}

module.exports = getAgents;