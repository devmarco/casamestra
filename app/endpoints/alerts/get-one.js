/* ------------------------------------ *\
	[AGENTS] GET ONE
\* ------------------------------------ */

var Boom 	= require('boom');
var Alerts 	= require('../../config/tables').alerts;

function getAlert(req, reply) {
	Alerts
		.get(req.params.alcmid)
		.run()
		.then(function then(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this alert not exist'));
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/estates/alerts/{alcmid}',
	handler: getAlert,
};
