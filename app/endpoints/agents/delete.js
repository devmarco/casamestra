var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[AGENTS] DELETE
\*------------------------------------*/

var deleteAgent = {
	method: 'DELETE',
	path: '/agents/{CRECI}',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [AGENTS]
		 */
		T_AGENTS = r.table('agents');

		del();

		function del() {
			T_AGENTS
				.get(parseInt(req.params.CRECI))
				.delete({
					returnChanges: true
				})
				.run()
				.then(function(result) {
					if (result.deleted === 0) {
						reply(Boom.notFound('Sorry, this agent not exist'));
					} else {
						reply({
							message: 'The agent was deleted'
						});
					}
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});
		}	
	}
}

module.exports = deleteAgent;