var model = require('../../models/estates');

/**
 * DELETE ALL OF ESTATES
 */
var getEstates = function(req, reply) {
	if (req.query.type) {
		if (req.query.type === 'buy' || req.query.type === 'rent' || req.query.type === 'sell') {
			verifyLimitAndOffset(req, reply, req.query.type);
		}
	} else {
		verifyLimitAndOffset(req, reply);
	}
}

function filterByLimit(req, reply, type) {
	var query

	if (type) {
		query = model.find({
			type: type
		}).limit(req.query.limit);
	} else {
		query = model.find().limit(req.query.limit);
	}

	query.exec(function(err, estates) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estates);
	});
}

function filterByOffset(req, reply, type) {
	var query

	if (type) {
		query = model.find({
			type: type
		}).skip(req.query.offset);
	} else {
		query = model.find().skip(req.query.offset);
	}

	query.exec(function(err, estates) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estates);
	});
}

function filterByLimitAndOffset(req, reply, type) {
	var query;

	if (type) {
		query = model.find({
			type: type
		}).skip(req.query.offset).limit(req.query.limit);
	} else {
		query = model.find().skip(req.query.offset).limit(req.query.limit);
	}


	query.exec(function(err, estates) {
		if (err) {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": err
			});
		}

		reply(estates);
	});
}

function getAllResults(req, reply, type) {

	if (type) {
		model.find({
			type: type
		}, function(err, estates) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": err
				});
			}

			reply(estates);
		});
	} else {
		model.find().sort({
			$natural: 1
		}).exec(function(err, estates) {
			if (err) {
				return reply({
					"code": 0,
					"message": "Something bad happened :(",
					"description": err
				});
			}

			reply(estates);
		});
	}
}

function verifyLimitAndOffset(req, reply, type) {
	if (req.query.limit && req.query.offset) {
		if (typeof parseInt(req.query.limit) !== 'number' || typeof parseInt(req.query.offset) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Limit and Offset must be a number'
			});
		}

		filterByLimitAndOffset(req, reply, type);

	} else if (req.query.offset) {
		if (typeof parseInt(req.query.offset) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Offset must be a number'
			});
		}

		filterByOffset(req, reply, type);

	} else if (req.query.limit) {
		if (typeof parseInt(req.query.limit) !== 'number') {
			return reply({
				"code": 0,
				"message": "Something bad happened :(",
				"description": 'Limit must be a number'
			});
		}

		filterByLimit(req, reply, type);

	} else {
		getAllResults(req, reply, type);
	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = function(server) {
	server.route({
		method: 'GET',
		path: '/estates',
		handler: getEstates
	});
};