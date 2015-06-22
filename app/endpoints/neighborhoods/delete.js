/*------------------------------------*\
	[NEIGHBORHOODS] DELETE
\*------------------------------------*/

var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

var handleDelete = {
	method: 'DELETE',
	path: '/neighborhoods/{NCMID}',
	handler: deleteNeighborhoods
}

/*
 * Delete a Neighborhood
 */
function deleteNeighborhoods(req, reply) {
	Neighborhoods
		.get(req.params.NCMID)
		.delete({
			returnChanges: true
		})
		.run()
		.then(function(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this neighborhood not exist'));
			} else {
				reply({
					message: 'The neighborhood was deleted'
				});
			}
		}).error(function(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = handleDelete;