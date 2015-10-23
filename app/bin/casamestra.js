'use strict';

const Hapi 		= require('hapi');
const routes 	= require('../config/routes');
const plugins 	= require('../config/plugins');
const crons 	= require('../config/crons');

/**
 * Casamestra base class which create, config and instantiate a new server
 */
class Casamestra {
	constructor() {
		this.server = new Hapi.Server();
		this.config();
	}

	config() {
		this.server.connection({
			host: '127.0.0.1',
			port: process.env.PORT || 8085,
			routes: {
				cors: true,
			},
			router:	{
				stripTrailingSlash: true,
			},
		});

		plugins.init(this.server);

		routes.create(this.server);

		crons.start();
	}

	init() {
		const server = this.server;
		server.start(() => console.info('Info: ', 'Server running at: ', server.info.uri));
	}
}

module.exports = Casamestra;
