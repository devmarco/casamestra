var alerts = [];

module.exports = {
	set: function(alert) {
		if (!alert) {
			return false;
		} 

		alerts.push(alert)

		return true;
	},
	delete: function(index) {
		if (typeof index !== 'number') {
			return false;
		}

		alerts.splice(index, 1);

		return true;
	},
	get: function(index) {
		if (typeof index !== 'number') {
			return alerts;
		}

		if (alerts[index]) {
			return alerts[index];
		} else {
			return false;
		}
	}
}