/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Async   = require('async');
var Alerts 	= require('../../config/tables').alerts;
var Users 	= require('../../config/tables').users;

var handleGet = {
	method: 'GET',
	path: '/estates/alerts/user/{ucmid}',
	handler: getAlerts
}

function getAlerts(req, reply) {
	
	function checkUser(next) {

		Users
			.get(req.params.ucmid)
			.run()
			.then(function(result) {
				if (result) {
					next();
				} else {
					next(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(function(err) {
				next(Boom.forbidden('Try again some time'));
			});
	};

	function get(next) {
		
		Alerts
			.filter(function(alerts) {
				return alerts('ucmid').eq(req.params.ucmid);
			})
			.run()
			.then(function(result) {
				next(result);
			}).error(function(err) {
				next(Boom.badRequest('Try again some time'));
			});
	};

	Async.waterfall([
		checkUser,
		get,
	], function(err, result) {
		reply(result || err);
	});
}

module.exports = handleGet;