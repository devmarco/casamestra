/* ------------------------------------ *\
	[PLUGINS]
\* ------------------------------------ */

var goodPlugin = {
	register: require('good'),
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				log: '*',
				response: '*',
			},
		}],
	},
};

var plugins = function plugins(server) {
	/**
	 * Register plugins to hapi server
	 */
	server.register([goodPlugin], function register(err) {
		if (err) {
			throw err;
		}
	});
};

module.exports = {
	init: function init(server) {
		plugins(server);
	},
};
