/* ------------------------------------ *\
	[ESTATE] DELETE
\* ------------------------------------ */

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;

function deleteEstate(req, reply) {
	Estates
		.get(req.params.ecmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(function then(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this estate not exist'));
			} else {
				reply({
					message: 'The estate was deleted',
				});
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = {
	method: 'DELETE',
	path: '/estates/{ecmid}',
	handler: deleteEstate,
};
