var Filter = require('../../helpers/filter');

/*------------------------------------*\
    [ESTATES] GET
\*------------------------------------*/

var getEstates = {
	method: 'GET',
	path: '/estates/rent',
	handler: function(req, reply) {
		/**
		 * Verify the request parameters and return the result
		 * Available parameters:
		 * - type [number]
		 * - limit [number]
		 * - offset [number]
		 */

		Filter('estates', req, reply, {
			type: 'rent'
		});
	}
}


/**
 * EXPORT FUNCTION
 * @param [server]
 */
module.exports = getEstates;