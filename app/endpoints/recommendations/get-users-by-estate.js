/* ------------------------------------ *\
	[FAVORITES] GET
\* ------------------------------------ */

'use strict';

const Boom 	= require('boom');
const Users = require('../../config/tables').users;

const getRecommendations = (req, reply) => {
	Users
		.filter(function filter(users) {
			return users('suggestions').contains(suggestion => {
				return suggestion('ecmid').eq(req.params.ecmid);
			});
		})
		.run()
		.then(result => {
			reply(result);
		}).error(() => reply(Boom.badRequest('Sorry, Something are wrong!')));
};

module.exports = {
	method: 'GET',
	path: '/recommend/users/{ecmid}',
	handler: getRecommendations,
};
