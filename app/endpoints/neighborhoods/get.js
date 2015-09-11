/* ------------------------------------ *\
	[NEIGHBORHOODS] GET
\* ------------------------------------ */

'use strict';

const Boom 			= require('boom');
const Neighborhoods = require('../../config/tables').neighborhoods;

const getNeighborhoods = (req, reply) => {
	Neighborhoods
		.run()
		.then(function then(result) {
			reply(result);
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/neighborhoods',
	handler: getNeighborhoods,
};
