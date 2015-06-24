var Lab 	= require('lab');
var Code 	= require('code');
var Shot 	= require('shot');
var lab 	= exports.lab = Lab.script();
var app 	= require('../../app/bin/casamestra');

var server,
	options,
	dispatch;

lab.experiment('[POST:Users]', function() {
	lab.before(function(done) {

		dispatch = function (req, res) {
			res.end('Marco');
		};

		options = {
			method: 'POST',
			url: '/estates',
			payload: {
				firstName: 'Marco Paulo',
				lastName: 'Patricio',
				email: 'markoskt@gmail.com',
				phones: {
					cellphone: '(31) 9813-1398',
					homephone: '(31) 3581-7138'
				},
				password: '123456'
			}
		};

		done();
	});

	lab.test('Should create a new estate', function(done) {
		Shot.inject(dispatch, options, function(response) {
			var result = response;

			console.log('RESULT', result);

			//Code.expect(result.firstName).to.equal(options.payload.firstName);
			done();
		});
	});
});