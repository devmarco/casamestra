/* ------------------------------------ *\
	[CRONS]
\* ------------------------------------ */

var crons = {
	alerts: require('../crons/alerts'),
};

module.exports = {
	start: function start() {
		for (i in crons) {
			if (crons[i].init && typeof crons[i].init === 'function') {
				crons[i].init();
			}
		}
	},
};
