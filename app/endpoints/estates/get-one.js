var DB      = require('../../config/settings').db;
var r       = require('rethinkdbdash')(DB);
var Boom    = require('boom');

/*------------------------------------*\
	[ESTATES] GET ONE
\*------------------------------------*/

var getOneEstate = {
	method: 'GET',
	path: '/estates/{ECMID}',
	handler: function(req, reply) {
		r.table('estates')
			.get(req.params.ECMID)
			.run()
			.then(function(result) {
				if (result) {
					reply(result);
				} else {
					reply(Boom.notFound('Sorry, this estate not exist'));
				}
			}).error(function(err) {
				reply(Boom.badRequest('Try again some time'));
			});
	}
}

module.exports = getOneEstate;