var DB 		= require('../config/settings').db;
var r 		= require('rethinkdbdash')(DB);
var Boom 	= require('boom');
var customFilter = {};

/**
 * Filter result by limit
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} limit      [The number of limit]
 */
function filterByLimit(tableName, limit) {
	var limit = parseInt(limit);

	query = r.table(tableName).filter(customFilter).limit(limit);

	return query;
}

/**
 * Filter result by offset
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} offset     [The number of offset]
 */
function filterByOffset(tableName, offset) {
	var offset = parseInt(offset);

	query = r.table(tableName).filter(customFilter).skip(offset);

	return query;
}

/**
 * Filter result by limit and offset
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} limit      [The number of limit]
 * @param  {[number]} offset     [The number of offset]
 */
function filterByLimitAndOffset(tableName, limit, offset) {
	var offset = parseInt(offset),
		limit = parseInt(limit),
		query;

	query = r.table(tableName).filter(customFilter).skip(offset).limit(limit);

	return query;
}


/**
 * Verify the request parameters
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[object]} req        [The request object]
 */
function verifyLimitAndOffset(tableName, req, option) {
	var limit,
		offset;

	if (option) customFilter = option;

	if (req.query.limit && req.query.offset) {
		if (typeof parseInt(req.query.limit) !== 'number' || typeof parseInt(req.query.offset) !== 'number') {
			return Boom.badRequest('Limit and Offset must be a number');
		}

		return filterByLimitAndOffset(tableName, req.query.limit, req.query.offset);

	} else if (req.query.offset) {
		if (typeof parseInt(req.query.offset) !== 'number') {
			return Boom.badRequest('Offset must be a number');
		}

		return filterByOffset(tableName, req.query.offset);

	} else if (req.query.limit) {
		if (typeof parseInt(req.query.limit) !== 'number') {
			return Boom.badRequest('Limit must be a number');
		}

		return filterByLimit(tableName, req.query.limit);

	} else {
		return false;
	}
}

module.exports = verifyLimitAndOffset;