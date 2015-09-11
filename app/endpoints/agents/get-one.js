/* ------------------------------------ *\
	[AGENTS] GET ONE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Agents 	= require('../../config/tables').agents;

const getAgent = (req, reply) => {
	Agents
		.get(req.params.acmid)
		.run()
		.then(result => {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this agent not exist'));
			}
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/agents/{acmid}',
	handler: getAgent,
};
