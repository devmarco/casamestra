/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Alerts 	= require('../../config/tables').alerts;

function getAlerts(req, reply) {
	Alerts
		.run()
		.then(function then(result) {
			reply(result);
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/estates/alerts',
	handler: getAlerts,
};
