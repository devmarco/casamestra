/* ------------------------------------ *\
	[ALERTS] DELETE
\* ------------------------------------ */

var moment	= require('moment');
var Boom 	= require('boom');
var Joi 	= require('joi');
var Alerts 	= require('../../config/tables').alerts;

function removeAlert(req, reply) {
	Alerts
		.get(req.params.alcmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(function then(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this alert not exist'));
			} else {
				reply({
					status: 'success',
					message: 'This alert was deleted',
				});
			}
		}).error(function error(err) {
			reply(Boom.forbidden('Try again some time'));
		});
}

module.exports = {
	method: 'DELETE',
	path: '/estates/alerts/{alcmid}',
	handler: removeAlert,
};
