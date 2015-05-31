var DB 		= require('../../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');

/*------------------------------------*\
	[NEIGHBORHOODS] GET ONE
\*------------------------------------*/

var getOneNeighborhoods = {
	method: 'GET',
	path: '/neighborhoods/{NCMID}',
	handler: function(req, reply) {
		r.table('neighborhoods')
			.get(req.params.NCMID)
			.run()
			.then(function(result) {
				if (result) {
					reply(result);
				} else {
					reply(Boom.notFound('Sorry, this neighborhood not exist'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getOneNeighborhoods;