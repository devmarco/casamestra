/* ------------------------------------ *\
	[UTIL] FILTERS
\* ------------------------------------ */

'use strict';

const _ = require('lodash');

const filter = (config) => {
	const table = config.table;
	let query;
	let customValues = {};

	const filters = {
		pluck: config.fields || null,
		skip: parseInt(config.offset, 0) || null,
		limit: parseInt(config.limit, 0) || null,
	};

	if (config.options) customValues = config.options;
	if (config.values) customValues = _.merge(customValues, config.values);

	function mount() {
		let method;
		let value;

		query = table.filter(customValues);

		for (const key in filters) {
			if (Object.hasOwnProperty.call(filters, key)) {
				method  = key;
				value	= filters[key];

				if (value) {
					if (method === 'pluck') {
						value = value.split(',');
					}

					query = query[method](value);
				}
			}
		}

		return this;
	}

	function getQuery() {
		return query || false;
	}

	return {mount, getQuery};
};

const checkFilter = (table, req, option) => {
	const myFilter = filter({
		table: table,
		options: option,
		limit: req.query.limit,
		offset: req.query.offset,
		fields: req.query.fields,
		values: {
			bedrooms: req.query.bedrooms,
			price: req.query.price,
			bathrooms: req.query.bathrooms,
			neighborhood: req.query.neighborhood,
		},
	});


	return myFilter.mount().getQuery();
};

module.exports = checkFilter;
