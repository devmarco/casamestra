/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

var Boom 	= require('boom');
var Async   = require('async');
var Alerts 	= require('../../config/tables').alerts;
var Users 	= require('../../config/tables').users;

function getAlerts(req, reply) {
	function checkUser(next) {
		Users
			.get(req.params.ucmid)
			.run()
			.then(function then(result) {
				if (result) {
					next();
				} else {
					next(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(function error(err) {
				next(Boom.forbidden('Try again some time'));
			});
	}

	function get(next) {
		Alerts
			.filter(function filter(alerts) {
				return alerts('ucmid').eq(req.params.ucmid);
			})
			.run()
			.then(function then(result) {
				next(result);
			}).error(function error(err) {
				next(Boom.badRequest('Try again some time'));
			});
	}

	Async.waterfall([
		checkUser,
		get,
	], function reply(err, result) {
		reply(result || err);
	});
}

module.exports = {
	method: 'GET',
	path: '/estates/alerts/user/{ucmid}',
	handler: getAlerts,
};
