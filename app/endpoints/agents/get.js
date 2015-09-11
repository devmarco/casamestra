/* ------------------------------------ *\
	[AGENTS] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Agents 	= require('../../config/tables').agents;

const getAgent = (req, reply) => {
	Agents
		.run()
		.then(result => {
			reply(result);
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/agents',
	handler: getAgent,
};
