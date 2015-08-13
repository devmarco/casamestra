/* ------------------------------------ *\
	[ALERTS] CRON
\* ------------------------------------ */

var Estates	= require('../config/tables').estates;
var Alerts	= require('../config/tables').alerts;

function checkAlertsSubscribers(estate) {
	Alerts
		.filter(function filter(filter) {
			return filter('filters')
				.coerceTo('array')
				.map(function map(kv) {
					return Alerts.r.expr(estate)(kv.nth(0)).eq(kv.nth(1));
				})
				.reduce(function reduce(x, y) {
					return Alerts.r.and(x, y);
				});
		})
		.run()
		.then(function then(result) {
			// Do something
	}).error(function error(err) {
		// Do nothing
	});
}

function init() {
	Estates
		.changes()
		.run({cursor: true})
		.then(function then(cursor) {
			cursor.each(function each(err, estate) {
				if (err) {
					console.log(err);
				} else {
					// Respond to new records only
					if (estate.new_val && !estate.old_val) {
						checkAlertsSubscribers(estate.new_val);
					}
				}
			});
		});

	return true;
}

module.exports = {
	init: init,
};
