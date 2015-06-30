/*------------------------------------*\
	[AGENTS] GET ONE
\*------------------------------------*/

var Boom 	= require('boom');
var Alerts 	= require('../../config/tables').alerts;

var handleGet = {
	method: 'GET',
	path: '/estates/alerts/{alcmid}',
	handler: getAlert
}

function getAlert(req, reply) {

	Alerts
		.get(req.params.alcmid)
		.run()
		.then(function(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this alert not exist'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;