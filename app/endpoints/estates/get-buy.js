var Filter = require('../../helpers/filter');

/*------------------------------------*\
    [ESTATES] GET
\*------------------------------------*/

var getEstates = {
	method: 'GET',
	path: '/estates/buy',
	handler: function(req, reply) {
		/**
		 * Verify the request parameters and return the result
		 * Available parameters:
		 * - type [number]
		 * - limit [number]
		 * - offset [number]
		 */

		Filter('estates', req, reply, {
			type: 'buy'
		});
	}
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = getEstates;