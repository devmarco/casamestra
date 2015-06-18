var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;

/*------------------------------------*\
	[ESTATE] DELETE
\*------------------------------------*/

var handleDelete = {
	method: 'DELETE',
	path: '/estates/{ECMID}',
	handler: deleteEstate
}

/*
 * Delete the Agent
 */
function deleteEstate(req, reply) {
	Estates
		.get(req.params.ECMID)
		.delete({
			returnChanges: true
		})
		.run()
		.then(function(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this estate not exist'));
			} else {
				reply({
					message: 'The estate was deleted'
				});
			}
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleDelete;