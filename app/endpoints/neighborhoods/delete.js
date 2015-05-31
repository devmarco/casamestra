var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[NEIGHBORHOODS] DELETE
\*------------------------------------*/

var deleteNeighborhoods = {
	method: 'DELETE',
	path: '/neighborhoods/{NCMID}',
	handler: function(req, reply) {
		r.table('neighborhoods')
			.get(req.params.NCMID)
			.delete({
				returnChanges: true
			})
			.run()
			.then(function(result) {
				if (result.deleted === 0) {
					reply(Boom.notFound('Sorry, this neighborhood not exist'));
				} else {
					reply({
						message: 'The neighborhood was deleted'
					});
				}
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	}
}

module.exports = deleteNeighborhoods;