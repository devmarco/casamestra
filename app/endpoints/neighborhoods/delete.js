/* ------------------------------------ *\
	[NEIGHBORHOODS] DELETE
\* ------------------------------------ */

var Boom 			= require('boom');
var Neighborhoods 	= require('../../config/tables').neighborhoods;

function deleteNeighborhoods(req, reply) {
	Neighborhoods
		.get(req.params.ncmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(function then(result) {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this neighborhood not exist'));
			} else {
				reply({
					message: 'The neighborhood was deleted',
				});
			}
		}).error(function error(err) {
			reply(Boom.badRequest('Something bad happen :('));
		});
}

module.exports = {
	method: 'DELETE',
	path: '/neighborhoods/{ncmid}',
	handler: deleteNeighborhoods,
};
