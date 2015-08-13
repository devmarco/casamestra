/* ------------------------------------ *\
	[ESTATES] GET ONE
\* ------------------------------------ */

var Boom    = require('boom');
var Estates = require('../../config/tables').estates;

function getEstates(req, reply) {
	Estates
		.get(req.params.ecmid)
		.run()
		.then(function then(result) {
			if (result) {
				reply(result);
			} else {
				reply(Boom.notFound('Sorry, this estate not exist'));
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Try again some time'));
		});
}

module.exports = {
	method: 'GET',
	path: '/estates/{ecmid}',
	handler: getEstates,
};
