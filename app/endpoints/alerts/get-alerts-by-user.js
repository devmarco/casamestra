/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Alerts 	= require('../../config/tables').alerts;
var Users 	= require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/estates/alerts/user/{UCMID}',
	handler: getAlerts
}

function getAlerts(req, reply) {
	
	(function checkUser() {

		Users
			.get(req.params.UCMID)
			.run()
			.then(function(result) {
				if (!result) {
					reply(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(function(err) {
				reply(Boom.forbidden('Try again some time'));
			});
	}());

	(function get() {
		
		Alerts
			.filter(function(alerts) {
				return alerts('UCMID').eq(req.params.UCMID);
			})
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}());
}

module.exports = handleGet;