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
		host: '54.207.101.8',
		port: 28015,
		db: 'casamestra',
		authKey: 'cminstance',
	},
};

module.exports = config;
