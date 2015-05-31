var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[NEIGHBORHOODS] GET
\*------------------------------------*/

var getNeighborhoods = {
	method: 'GET',
	path: '/neighborhoods',
	handler: function(req, reply) {
		r.table('neighborhoods')
			.run()
			.then(function(result) {
				reply(result);
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getNeighborhoods;