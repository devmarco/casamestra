/* ------------------------------------ *\
	[AGENTS] GET ONE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Alerts 	= require('../../config/tables').alerts;

const getAlert = (req, reply) => {
	Alerts
		.get(req.params.alcmid)
		.run()
		.then(result => {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this alert not exist'));
			}
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/estates/alerts/{alcmid}',
	handler: getAlert,
};
