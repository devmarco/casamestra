/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Alerts 	= require('../../config/tables').alerts;

var handleGet = {
	method: 'GET',
	path: '/estates/alerts',
	handler: getAlerts
}

function getAlerts(req, reply) {
	
	Alerts
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;