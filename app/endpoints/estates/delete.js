/*------------------------------------*\
    [ESTATES] DELETE ONE
\*------------------------------------*/

var deleteEstate = {
	method: 'DELETE',
	path: '/estates/{ESTATEID}',
	handler: function(req, reply) {
		var DB = req.server.plugins['hapi-mongodb'].db,
			ObjectID = req.server.plugins['hapi-mongodb'].ObjectID,
			collection;

		//Set the collection
		collection = DB.collection('estates');

		collection.deleteOne({
			_id: new ObjectID(req.params.ESTATEID)
		}, function(err, result) {
			if (err) {
				return reply({
					'code': 0,
					'message': 'Something bad happened :(',
					'description': err
				});
			}

			reply({
				'code': 0,
				'message': 'success',
				'description': 'Estate was deleted'
			});

		});

	}
}

/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = deleteEstate;