var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();
var app = require('../../app/bin/casamestra');

var server,
	request;
	
lab.experiment('[GET:Users]', function() {

	lab.beforeEach(function(done) {
		server = app.config.server;

		request = {
			method: 'GET',
			url: '/users'
		};

		done();
	});

	lab.test('Should retrieve a list of users', function(done) {
		server.inject(request, function(res) {
			var result = res.result;

			Code.expect(res.statusCode).to.equal(200);
			Code.expect(result).to.be.instanceof(Array);
			done();
		});
	});
});

lab.after(function(done) {
	done();
});