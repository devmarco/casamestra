/* ------------------------------------ *\
	[ALERTS] DELETE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Alerts 	= require('../../config/tables').alerts;

const removeAlert = (req, reply) => {
	Alerts
		.get(req.params.alcmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(result => {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this alert not exist'));
			} else {
				reply({
					status: 'success',
					message: 'This alert was deleted',
				});
			}
		}).error(() => reply(Boom.forbidden('Try again some time')));
};

module.exports = {
	method: 'DELETE',
	path: '/estates/alerts/{alcmid}',
	handler: removeAlert,
};
