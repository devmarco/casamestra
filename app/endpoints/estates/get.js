var Filter = require('../../helpers/filter');

/*------------------------------------*\
    [ESTATES] GET
\*------------------------------------*/

var getEstates = {
	method: 'GET',
	path: '/estates',
	handler: function(req, reply) {
		/**
		 * Verify the request parameters and return the result
		 * Available parameters:
		 * - type [number]
		 * - limit [number]
		 * - offset [number]
		 */

		Filter('estates', req, reply);
	}
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = getEstates;