var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var Joi 	= require('joi');

/*------------------------------------*\
	[ALERTS] DELETE
\*------------------------------------*/

var deleteAlert = {
	method: 'DELETE',
	path: '/estates/alert/{ALCMID}',
	handler: function(req, reply) {

		/*
		 * Set the table
		 * Table: [ALERTS]
		 */
		var T_ALERTS = r.table('agents'),
			T_ESTATES = r.table('estates');

		del();

		function del() {
			T_ALERTS
				.get(req.params.ALCMID)
				.delete({
					returnChanges: true
				})
				.run()
				.then(function(result) {

					if (result.deleted === 0) {
						reply(Boom.notFound('Sorry, this alert not exist'));
					} else {
					
						console.log('INDEX', result.index);

						if (myCursor) {
							var myCursor = Storage.delete(result.index);

							if (myCursor) {
								reply({
									message: 'Alert created',
									filters: req.payload
								});
							} else {
								reply(Boom.badRequest('Something bad happen :('));
							}
						}
					}
				}).error(function(err) {
					reply(Boom.badRequest('Something bad happen :('));
				});
		}
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			}
		}
	}
}

module.exports = deleteAlert;