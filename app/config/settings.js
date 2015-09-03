/* ------------------------------------ *\
	[SETTINGS]
\* ------------------------------------ */

var config = {
	url: {
		path: 'http://localhost:7070',
		agents: '/agents',
		neighborhoods: '/neighborhoods',
		buy: '/search/buy',
		sell: '/search/sell',
		rent: '/search/rent',
		investiments: '/investiments',
	},
	db: {
		host: '127.0.0.1',
		port: 28015,
		db: 'casamestra',
		authKey: 'cminstance',
	},
};

module.exports = config;
