/*------------------------------------*\
	[ESTATES] GET ONE
\*------------------------------------*/

var Boom    = require('boom');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/estates/{ecmid}',
	handler: getEstates
}

function getEstates(req, reply) {

	Estates
		.get(req.params.ecmid)
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