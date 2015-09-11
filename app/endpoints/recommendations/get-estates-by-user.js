/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

'use strict';

const Boom 		= require('boom');
const Users 	= require('../../config/tables').users;
const Estates 	= require('../../config/tables').estates;

const getRecommendations = (req, reply) => {
	Users
		.get(req.params.ucmid)('suggestions')
		.innerJoin(Estates, (userRow, estatesRow) => {
			return estatesRow('ecmid').eq(userRow('ecmid'));
		})
		.zip()
		.run()
		.then(result => {
			reply(result);
		}).error(() => reply(Boom.badRequest('Sorry, Something are wrong!')));
};

module.exports = {
	method: 'GET',
	path: '/recommend/estates/{ucmid}',
	handler: getRecommendations,
};
