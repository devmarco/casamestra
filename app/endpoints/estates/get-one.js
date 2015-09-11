/* ------------------------------------ *\
	[ESTATES] GET ONE
\* ------------------------------------ */

'use strict';

const Boom    = require('boom');
const Estates = require('../../config/tables').estates;

const getEstates = (req, reply) => {
	Estates
		.get(req.params.ecmid)
		.run()
		.then(result => {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this estate not exist'));
			}
		}).error(() => reply(Boom.badRequest('Try again some time')));
};

module.exports = {
	method: 'GET',
	path: '/estates/{ecmid}',
	handler: getEstates,
};
