var Boom    = require('boom');
var Estates = require('../../config/tables').estates;

/*------------------------------------*\
	[ESTATES] GET ONE
\*------------------------------------*/

var handleGet = {
	method: 'GET',
	path: '/estates/{ECMID}',
	handler: getEstates
}

/*
 * Get an Estate
 */
function getEstates(req, reply) {
	Estates
		.get(req.params.ECMID)
		.run()
		.then(function(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this estate not exist'));
			}
		}).error(function(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = handleGet;