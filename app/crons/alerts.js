/*------------------------------------*\
	[ALERTS] CRON
\*------------------------------------*/

var Estates	= require('../config/tables').estates;
var Alerts	= require('../config/tables').alerts;

function init() {
	Estates
		.changes()
		.run({cursor: true})
		.then(function(cursor) {
			cursor.each(function(err, estate) {
				if (err) {
					console.log(err);
				} else {
					//Respond to new records only
					if (estate.new_val && !estate.old_val) {
						checkAlertsSubscribers(estate.new_val);
					}
				}
			});
		});

	return true;
};


function checkAlertsSubscribers(estate) {
	Alerts
		.filter(function(filter) {
			return filter('filters')
				.coerceTo('array')
				.map(function(kv) {
					return Alerts.r.expr(estate)(kv.nth(0)).eq(kv.nth(1));
				})
				.reduce(function(x, y) { 
					return Alerts.r.and(x, y); 
				})
    	})
		.run()
		.then(function(result) {
			//Do something
		}).error(function(err) {
			//Do nothing
		});

	return true;
}

module.exports = {
	init: init
};