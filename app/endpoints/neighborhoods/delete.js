/* ------------------------------------ *\
	[NEIGHBORHOODS] DELETE
\* ------------------------------------ */

'use strict';

const Boom 			= require('boom');
const Neighborhoods = require('../../config/tables').neighborhoods;

const deleteNeighborhoods = (req, reply) => {
	Neighborhoods
		.get(req.params.ncmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(result => {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this neighborhood not exist'));
			} else {
				reply({
					message: 'The neighborhood was deleted',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
};

module.exports = {
	method: 'DELETE',
	path: '/neighborhoods/{ncmid}',
	handler: deleteNeighborhoods,
};
