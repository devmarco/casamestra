/*------------------------------------*\
    [ESTATES] GET ONE
\*------------------------------------*/

var getOneEstates = {
    method: 'GET',
    path: '/estates/{ESTATEID}',
    handler: function(req, reply) {

        DB 	= req.server.plugins['hapi-mongodb'].db;
        ObjectID = req.server.plugins['hapi-mongodb'].ObjectID;

        DB.collection('estates')
        	.find({
        		_id: new ObjectID(req.params.ESTATEID)
        	})
        	.limit(1)
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
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = getOneEstates;
