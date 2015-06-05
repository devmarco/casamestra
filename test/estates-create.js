var Lab = require('lab'),
	lab = exports.lab = Lab.script(),
	server = require('../');

lab.test('Estates endpoint list all estates in database', function(done) {
	var options = {
		method: 'GET',
		path: '/estates'
	};

	server.inject(options, function(response) {
		var result = response.result;

		Lab.expect(response.statusCode).to.equal(200);
		Lab.expect(result).to.be.instanceof(Array);
		Lab.expect(result).to.have.length(2);

		done();
	});
});