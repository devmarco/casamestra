/*------------------------------------*\
	[ALERTS] DELETE
\*------------------------------------*/

var moment	= require('moment');
var Boom 	= require('boom');
var Joi 	= require('joi');
var Alerts 	= require('../../config/tables').alerts;

var handleDelete = {
	method: 'DELETE',
	path: '/estates/alerts/{alcmid}',
	handler: removeAlert
}

function removeAlert(req, reply) {
	
	Alerts
		.get(req.params.alcmid)
		.delete({
			returnChanges: true
		})
		.run()
		.then(function(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this alert not exist'));
			} else {
				reply({
					status: 'success',
					message: 'This alert was deleted'
				});
			}
		}).error(function(err) {
			reply(Boom.forbidden('Try again some time'));
		});
}

module.exports = handleDelete;