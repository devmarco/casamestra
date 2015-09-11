/* ------------------------------------ *\
	[CRONS]
\* ------------------------------------ */

'use strict';

const crons = [
	require('../crons/alerts'),
];

const start = () => {
	crons.forEach((value) => {
		if (value.init && typeof value.init === 'function') value.init();
	});
};

module.exports = { start };
