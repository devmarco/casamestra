var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[AGENTS] DELETE
\*------------------------------------*/

var createAgent = {
	method: 'DELETE',
	path: '/agents/{CRECI}',
	handler: function(req, reply) {
		r.table('agents')
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
				reply(Boom.forbidden('Something bad happen :('));
			});
	}
}

module.exports = createAgent;