var DB,
	customFilters;

/**
 * Filter result by limit
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} limit      [The number of limit]
 */
function filterByLimit(collection, reply, limit) {
	var findOptions = {},
		limit = parseInt(limit);

	//Add custom filters
	if (customFilters) findOptions = customFilters;

	DB.collection(collection)
		.find({})
		.limit(limit)
		.toArray(function(err, result) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": err
				});
			}

			reply(result);
		});
}

/**
 * Filter result by offset
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} offset     [The number of offset]
 */
function filterByOffset(collection, reply, offset) {
	var findOptions = {},
		offset = parseInt(offset);

	//Add custom filters
	if (customFilters) findOptions = customFilters;

	DB.collection(collection).find(findOptions)
		.skip(offset)
		.toArray(function(err, result) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": err
				});
			}

			reply(result);
		});
}

/**
 * Filter result by limit and offset
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[number]} limit      [The number of limit]
 * @param  {[number]} offset     [The number of offset]
 */
function filterByLimitAndOffset(collection, reply, limit, offset) {
	var findOptions = {},
		offset = parseInt(offset),
		limit = parseInt(limit);

	//Add custom filters
	if (customFilters) findOptions = customFilters;

	DB.collection(collection).find(findOptions)
		.skip(offset)
		.limit(limit)
		.toArray(function(err, result) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": err
				});
			}

			reply(result);
		});
}

/**
 * Return all results
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 */
function getAllResults(collection, reply) {
	var findOptions = {};

	//Add custom filters
	if (customFilters) findOptions = customFilters;

	DB.collection(collection).find(findOptions).toArray(function(err, result) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(result);
	});
}

/**
 * Verify the request parameters
 * @param  {[string]} collection [The name of collection]
 * @param  {[function]} reply    [The reply function]
 * @param  {[object]} req        [The request object]
 */
function verifyLimitAndOffset(collection, req, reply) {
	var limit,
		offset;

	if (req.query.limit && req.query.offset) {
		if (typeof parseInt(req.query.limit) !== 'number' || typeof parseInt(req.query.offset) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Limit and Offset must be a number'
			});
		}

		filterByLimitAndOffset(collection, reply, req.query.limit, req.query.offset);

	} else if (req.query.offset) {
		if (typeof parseInt(req.query.offset) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Offset must be a number'
			});
		}

		filterByOffset(collection, reply, req.query.offset);

	} else if (req.query.limit) {
		if (typeof parseInt(req.query.limit) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Limit must be a number'
			});
		}

		filterByLimit(collection, reply, req.query.limit);

	} else {
		getAllResults(collection, reply);
	}
}

module.exports = function(collection, req, reply, custom) {
	//Set the DB instance
	DB = req.server.plugins['hapi-mongodb'].db;

	if (typeof custom === 'object') {
		customFilters = custom;
	}

	//Verify and return data
	verifyLimitAndOffset(collection, req, reply);
}