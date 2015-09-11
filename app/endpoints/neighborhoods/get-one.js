/* ------------------------------------ *\
	[NEIGHBORHOODS] GET ONE
\* ------------------------------------ */

'use strict';

const Boom 			= require('boom');
const Neighborhoods = require('../../config/tables').neighborhoods;

const getNeighborhood = (req, reply) => {
	Neighborhoods
		.get(req.params.ncmid)
		.run()
		.then(function then(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this neighborhood not exist'));
			}
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/neighborhoods/{ncmid}',
	handler: getNeighborhood,
};
