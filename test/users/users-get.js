var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();
var app = require('../../app/bin/casamestra');

var server,
	options;

lab.experiment('[GET:Users]', function() {

	lab.before(function(done) {
		server = app.config.server;

		options = {
			method: 'GET',
			url: '/users'
		};

		done();
	});

	lab.test('Should retrieve a list of users', function(done) {
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(result).to.be.instanceof(Array);
			done();
		});
	});
});