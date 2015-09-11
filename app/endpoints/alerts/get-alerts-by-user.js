/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Async   	= require('async');
const Alerts 	= require('../../config/tables').alerts;
const Users 	= require('../../config/tables').users;

const getAlerts = (req, reply) => {
	function checkUser(next) {
		Users
			.get(req.params.ucmid)
			.run()
			.then(result => {
				if (result) {
					next();
				} else {
					next(Boom.notFound('Sorry, this user not exist'));
				}
			}).error(() => next(Boom.forbidden('Try again some time')));
	}

	function get(next) {
		Alerts
			.filter(alerts => {
				return alerts('ucmid').eq(req.params.ucmid);
			})
			.run()
			.then(result => {
				next(result);
			}).error(() => next(Boom.badRequest('Try again some time')));
	}

	Async.waterfall([
		checkUser,
		get,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: 'GET',
	path: '/estates/alerts/user/{ucmid}',
	handler: getAlerts,
};
