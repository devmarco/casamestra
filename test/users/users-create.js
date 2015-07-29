var Joi 	= require('joi');
var Lab 	= require('lab');
var Code 	= require('code');
var lab 	= exports.lab = Lab.script();
var Shot 	= require('shot');
var Schema  = require('../../app/models/user');

var options,
	dispatch;

lab.experiment('Users:', function() {
	lab.before(function(done) {

		dispatch = function (req, res) {
			Joi.validate(req._shot.payload, Schema, {
				presence: 'required'

			}, function (err, result) {
				if (err) {
					res.end(JSON.stringify(err));
				} else {
					res.end(JSON.stringify(result));
				}
				
			});
		};

		options = {
			method: 'POST',
			url: '/users',
			payload: {
				firstName: 'Marco Paulo',
				lastName: 'Patricio',
				email: 'markoskt@gmail.com',
				phones: {
					cellphone: '(31) 9813-1398',
					homephone: '(31) 3581-7138'
				}
			}
		};

		done();
	});

	lab.test('Should create a new user', function(done) {
		Shot.inject(dispatch, options, function(response) {
			var result = JSON.parse(response.payload);

			console.log('RESULT', result);

			//Code.expect(result.firstName).to.equal(options.payload.firstName);
			done();
		});
	});
});