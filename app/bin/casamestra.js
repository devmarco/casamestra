var Hapi = require('hapi');
var routes = require('../routes');
var config = require('../config/config');

//Create the server
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
		url: 'mongodb://' + config.db.username + ':' + config.db.password + '@ds061651.mongolab.com:61651/casamestra',
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

module.exports = server;