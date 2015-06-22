/*------------------------------------*\
	[PLUGINS]
\*------------------------------------*/

var goodPlugin = {
	register: require('good'),
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: { log: '*', response: '*' }
		}]
	}
}

var plugins = function(server) {
	/**
	 * Register plugins to hapi server
	 */
	server.register([goodPlugin], function(err) {
		if (err) {
			throw err;
		}
	});
};

module.exports = {
	init: function(server) {
		plugins(server);
	}
}