'use strict';

const Hapi 		= require('hapi');
const routes 	= require('../config/routes');
const plugins 	= require('../config/plugins');
const crons 	= require('../config/crons');
const internals = {};

// Create the server instance
internals.config = () => {
	const server = new Hapi.Server();
	// //Set the connection
	server.connection({
		host: '127.0.0.1',
		port: process.env.PORT || 8085,
		routes: {
			cors: true,
		},
		router:	{
			stripTrailingSlash: true,
		},
	});

	// Bootstrap Hapi Server Plugins, passes the server object to the plugins
	plugins.init(server);

	// Expose routes
	routes.create(server);

	// Run crons
	crons.start();

	return {
		server: server,
	};
};

// Init the server instance
internals.init = () => {
	const server = internals.config().server;
	// Start the server
	server.start(() => {
		console.info('Info: ', 'Server running at: ', server.info.uri);
	});
};


module.exports = internals;
