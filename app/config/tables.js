/* ------------------------------------ *\
	[DATABSE TABLES]
\* ------------------------------------ */

var DB 		= require('../config/settings').db;
var r 		= require('rethinkdbdash')(DB);

var dbTables = {
	estates: r.table('estates'),
	agents: r.table('agents'),
	users: r.table('users'),
	neighborhoods: r.table('neighborhoods'),
	alerts: r.table('alerts'),
};

/*
 * Expose rethinkDB instance to table objects
 */
for (key in dbTables) {
	if ({}.hasOwnProperty.call(dbTables, key)) {
		dbTables[key].r = r;
	}
}

module.exports = dbTables;
