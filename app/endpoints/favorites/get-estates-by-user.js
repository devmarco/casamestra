/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Estates 	= require('../../config/tables').estates;
const Users 	= require('../../config/tables').users;

const getFavorites = (req, reply) => {
	Users
		.get(req.params.ucmid)('favorites')
		.innerJoin(Estates, (userRow, estatesRow) => {
			return estatesRow('ecmid').eq(userRow('ecmid'));
		})
		.zip()
		.run()
		.then(function then(result) {
			reply(result);
		}).error(() => reply(Boom.badRequest('Sorry, Something are wrong!')));
};

module.exports = {
	method: 'GET',
	path: '/favorites/estates/{ucmid}',
	handler: getFavorites,
};
