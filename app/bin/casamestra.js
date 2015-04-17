var Hapi = require('hapi');
var mongoose = require('mongoose');
var routes = require('../routes');
var config = require('../config/config');

//Database connect
mongoose.connect('mongodb://' + config.db.username + ':' + config.db.password + '@ds061651.mongolab.com:61651/casamestra');

//Create the server
var server = new Hapi.Server();

//Set the connection
server.connection({
	host: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
	routes: {
		cors: true
	},
	router: {
		stripTrailingSlash: true
	}
});

//Expose routes
routes.create(server);

//Set the plugins
server.register({
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
}, function(err) {
	if (err)
		throw new Error(err);
});

module.exports = server;