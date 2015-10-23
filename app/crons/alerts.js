/* ------------------------------------ *\
	[ALERTS] CRON
\* ------------------------------------ */

'use strict';

const Estates 	= require('../config/tables').estates;
const Alerts	= require('../config/tables').alerts;

const checkAlertsSubscribers = estate => {
	Alerts
		.filter(filter => {
			return filter('filters')
				.coerceTo('array')
				.map(kv => Alerts.r.expr(estate)(kv.nth(0)).eq(kv.nth(1)))
				.reduce((x, y) => Alerts.r.and(x, y));
		})
		.run()
		.then(result => {
			// console.log('New Alert', result);
		}).error(err => {
			// console.log('Alert error: ', err);
		});
};

const init = () => {
	Estates
		.changes()
		.run({cursor: true})
		.then(cursor => {
			cursor.each((err, estate) => {
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
};

module.exports = { init };
