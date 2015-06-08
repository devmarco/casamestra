var repubsub = require('../../libs/repubsub');
var DB 		= require('../../config/settings').db;

/*------------------------------------*\
	[AGENTS] GET
\*------------------------------------*/

var createAlert = {
	method: 'POST',
	path: '/estates/alert',
	handler: function(req, reply) {

		function createEstate() {
			var count = 0;

			var exchange = new repubsub.Exchange('alerts', DB);

			var teste = setInterval(function() {

				var topic = exchange.topic({
				    bedrooms: ++count,
				    bathrooms: 2
				});

				topic.publish('Alert number: '+count+'');

				console.log('Create...', count);

				if (count === 10) {
					clearInterval(teste);
				}

			}, 10000);
		}

		function checkAlert() {
			var exchange = new repubsub.Exchange('alerts', DB);

			function filterFunc(alert) {
			    return alert.contains('fight', 'superhero');
			}

			exchange.queue(filterFunc).subscribe(function(topic, payload) {
			    console.log(topic, payload);
			});

		}

		createEstate();
		checkAlert();

		reply('Created');
	},
	config: {
		validate: {
			options: {
				abortEarly: false
			}
		}
	}
}

module.exports = createAlert;