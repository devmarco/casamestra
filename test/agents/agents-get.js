var Lab = require('lab');
var app = require('../../app/bin/casamestra');
var Sinon = require('sinon');
var lab = exports.lab = Lab.script();
var Code = require('code');

var server;
var request;

lab.experiment('[GET:Agents]', function experiment() {
	lab.beforeEach(function beforeEach(done) {
		server = app.config.server;
		request = {
			method: 'GET',
			url: '/agents',
		};
		done();
	});

	lab.test('Should retrieve a list of agents', function test(done) {
		server.inject(request, function inject(res) {
			var result = res.result;
            console.log(result);
			Code.expect(res.statusCode).to.equal(200);
			Code.expect(result).to.be.instanceof(Array);
			done();
		});
	});
});

lab.after(function after(done) {
	done();
});
