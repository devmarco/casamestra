var Hapi 		= require('hapi');
var settings 	= require('../config/settings');
var routes 		= require('../config/routes');
var plugins 	= require('../config/plugins');

var internals 	= {};

//Create the server instance
internals.config = (function() {
	var server = new Hapi.Server();

	// //Set the connection
	server.connection({
		host: '0.0.0.0',
		port: process.env.PORT || 8000,
		routes: {
			cors: true
		},
		router: {
			stripTrailingSlash: true
		}
	});

	// Bootstrap Hapi Server Plugins, passes the server object to the plugins
	plugins.init(server);
	
	// //Expose routes
	routes.create(server);

	return {
		server: server
	};
}());

//Init the server instance
internals.init = function() {
	var server = this.config.server;

	//Start the server
	server.start(function() {
		console.info('Info: ', 'Server running at: ', server.info.uri);
	});
}


module.exports = internals;