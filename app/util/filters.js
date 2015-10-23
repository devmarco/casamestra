/* ------------------------------------ *\
	[UTIL] FILTERS
\* ------------------------------------ */

'use strict';

class Filter {
	constructor(table, req, options) {
		this.table 		= table;
		this.req 		= req;
		this.options 	= options;
		this.limit 		= req.query.limit  || null;
		this.offset 	= req.query.offset || null;
		this.fields 	= req.query.fields || null;

		this.resolveFilter().mount();
	}

	resolveFilter() {
		this.filters = {
			pluck: this.fields,
			skip: parseInt(this.offset, 0) || null,
			limit: parseInt(this.limit, 0) || null,
		};

		if (this.options) this.custom = this.options;

		return this;
	}

	mount() {
		this.filterQuery = this.table.filter(this.custom || {});

		for (const key in this.filters) {
			if (key) {
				const method  = key;
				const value	= this.filters[key];

				if (value) {
					if (method === 'pluck') {
						value = value.split(',');
					}

					this.filterQuery = this.filterQuery[method](value);
				}
			}
		}
	}

	query() {
		return this.filterQuery || false;
	}
}

module.exports = Filter;
