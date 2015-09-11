/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Users 	= require('../../config/tables').users;

function getFavorites(req, reply) {
	Users
		.filter(function filter(users) {
			return users('favorites').contains(favorite => {
				return favorite('ecmid').eq(req.params.ecmid);
			});
		})
		.run()
		.then(function then(result) {
			reply(result);
		}).error(() => reply(Boom.badRequest('Sorry, Something are wrong!')));
}

module.exports = {
	method: 'GET',
	path: '/favorites/users/{ecmid}',
	handler: getFavorites,
};
