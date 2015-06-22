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

/*
 * Get all Agents
 */
function getAlerts(req, reply) {
	/*
	 * Check if the User exist before retrieve the alerts
	 */
	Users
		.get(req.params.UCMID)
		.run()
		.then(function(result) {
			if (result) {
				get();
			} else {
				reply(Boom.notFound('Sorry, this user not exist'));
			}
		}).error(function(err) {
			reply(Boom.forbidden('Try again some time'));
		});

	function get() {
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
	}
}

module.exports = handleGet;