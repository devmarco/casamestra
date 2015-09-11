/* ------------------------------------ *\
	[PLUGINS]
\* ------------------------------------ */

'use strict';

const goodPlugin = {
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

const plugins = server => {
	server.register([goodPlugin], err => {
		if (err) throw err;
	});
};

const init = server => {
	plugins(server);
};

module.exports = { init };
