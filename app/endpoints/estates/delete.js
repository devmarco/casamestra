var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[ESTATE] DELETE
\*------------------------------------*/

var deleteEstate = {
	method: 'DELETE',
	path: '/estates/{CMID}',
	handler: function(req, reply) {
		r.table('estates')
			.get(req.params.CMID)
			.delete({
				returnChanges: true
			})
			.run()
			.then(function(result) {
				if (result.deleted === 0) {
					reply(Boom.notFound('Sorry, this estate not exist'));
				} else {
					reply({
						message: 'The estate was deleted'
					});
				}
			}).error(function(err) {
				reply(Boom.badRequest('Something bad happen :('));
			});
	}
}

module.exports = deleteEstate;