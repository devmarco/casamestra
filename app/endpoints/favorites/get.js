/*------------------------------------*\
	[FAVORITES] GET
\*------------------------------------*/

var Boom 	= require('boom');
var Estates = require('../../config/tables').estates;

var handleGet = {
	method: 'GET',
	path: '/favorites',
	handler: getFavorites
}

/*
 * Get all favorited estates
 */
function getFavorites(req, reply) {
	Estates
		.filter(function(estates) {
			return estates('favorites').count().ne(0);
		})
		.run()
		.then(function(result) {
			reply(result);
		}).error(function(err) {
			reply(Boom.badRequest('Sorry, Something are wrong!'));
		});
}

module.exports = handleGet;