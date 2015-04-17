var request = require('supertest');
var expect = require('expect.js');

describe('Agents', function() {
	var fetch;

	beforeEach(function() {
		fetch = request('http://localhost:8080');
	});

	it('Should return all agents', function(done) {
		fetch.get('/agents').end(function(err, res) {
			expect(res.body.length).to.not.equal(0);
			done();
		});
	});

	it('Should return one agent', function(done) {
		fetch.get('/agents/552c1ab1e641b0a40ce57f14').end(function(err, res) {
			expect(res.body.length).to.equal(1);
			done();
		});
	});

	it('Should delete an agent', function(done) {
		fetch.delete('/agents/6545').end(function(err, res) {
			expect(res.body.description).to.equal('Agent was deleted');
			done();
		});
	});

	it('Should fail when I try to delete an agent with an invalid creci', function(done) {
		fetch.delete('/agents/552c1ab1e641b0a40ce57f14').end(function(err, res) {
			expect(res.body.description).to.equal('This agent not exist');
			done();
		});
	});
});