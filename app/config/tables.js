/* ------------------------------------ *\
	[DATABSE TABLES]
\* ------------------------------------ */

'use strict';

const DB 	= require('../config/settings').db;
const r		= require('rethinkdbdash')(DB);

const tables = {
	estates: r.table('estates'),
	agents: r.table('agents'),
	users: r.table('users'),
	neighborhoods: r.table('neighborhoods'),
	alerts: r.table('alerts'),
};

/*
 * Expose rethinkDB instance to table objects
 */
for (const key in tables) {
	if (Object.hasOwnProperty.call(tables, key)) tables[key].r = r;
}

module.exports = tables;
