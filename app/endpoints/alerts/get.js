/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Alerts 	= require('../../config/tables').alerts;

function getAlerts(req, reply) {
	Alerts
		.run()
		.then(result => {
			reply(result);
		}).error(() => reply(Boom.badRequest('Try again some time')));
}

module.exports = {
	method: 'GET',
	path: '/estates/alerts',
	handler: getAlerts,
};
