var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[ESTATE] DELETE
\*------------------------------------*/

var deleteEstate = {
	method: 'DELETE',
	path: '/estates/{ECMID}',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ESTATES]
		 */
		var T_ESTATES = r.table('estates');

		del();

		function del() {
			T_ESTATES
				.get(req.params.ECMID)
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
}

module.exports = deleteEstate;