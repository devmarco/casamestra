var Hapi = require('hapi');
var routes = require('../routes');
var config = require('../config/config');

var internals = {};

//Create the server instance
internals.config = function() {
	var server = new Hapi.Server();

	//Set the connection
	server.connection({
		host: '0.0.0.0',
		port: process.env.PORT || 8080,
		routes: {
			cors: true
		},
		router: {
			stripTrailingSlash: true
		}
	});


	//Set the plugins
	server.register([{
		register: require('good'),
		options: {
			reporters: [{
				reporter: require('good-console'),
				events: {
					log: '*',
					response: '*'
				}
			}]
		}
	}, {
		register: require('hapi-mongodb'),
		options: {
			url: 'mongodb://127.0.0.1:27017',
			settings: {
				db: {
					"native_parser": false
				}
			}
		}
	}], function(err) {
		if (err)
			throw new Error(err);
	});

	//Expose routes
	routes.create(server);

	return server;
}

//Init the server instance
internals.init = function() {

	var server = this.config();

	//Start the server
	server.start(function() {
		console.info('Info: ', 'Server running at: ', server.info.uri);
	});
}


module.exports = internals;