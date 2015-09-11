/* ------------------------------------ *\
	[ESTATE] DELETE
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Estates 	= require('../../config/tables').estates;

function deleteEstate(req, reply) {
	Estates
		.get(req.params.ecmid)
		.delete({
			returnChanges: true,
		})
		.run()
		.then(result => {
			if (result.deleted === 0) {
				reply(Boom.notFound('Sorry, this estate not exist'));
			} else {
				reply({
					message: 'The estate was deleted',
				});
			}
		}).error(() => reply(Boom.badRequest('Something bad happen :(')));
}

module.exports = {
	method: 'DELETE',
	path: '/estates/{ecmid}',
	handler: deleteEstate,
};
