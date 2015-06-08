/**
 * ROUTES HANDLER
 */
var routes = [
	// Agents
	require('../../app/endpoints/agents/get'),
	require('../../app/endpoints/agents/get-one'),
	require('../../app/endpoints/agents/create'),
	require('../../app/endpoints/agents/update'),
	require('../../app/endpoints/agents/delete'),

	//Estates
	require('../../app/endpoints/estates/get'),
	require('../../app/endpoints/estates/get-one'),
	require('../../app/endpoints/estates/get-buy'),
	require('../../app/endpoints/estates/get-rent'),
	require('../../app/endpoints/estates/create'),
	require('../../app/endpoints/estates/update'),
	require('../../app/endpoints/estates/delete'),

	//Neighborhoods
	require('../../app/endpoints/neighborhoods/get'),
	require('../../app/endpoints/neighborhoods/get-one'),
	require('../../app/endpoints/neighborhoods/create'),
	require('../../app/endpoints/neighborhoods/update'),
	require('../../app/endpoints/neighborhoods/delete'),

	//Favorites
	require('../../app/endpoints/favorites/get'),
	require('../../app/endpoints/favorites/get-estates-by-user'),
	require('../../app/endpoints/favorites/get-users-by-estate'),
	require('../../app/endpoints/favorites/create'),
	require('../../app/endpoints/favorites/delete'),

	//Users
	require('../../app/endpoints/users/get'),
	require('../../app/endpoints/users/get-one'),
	require('../../app/endpoints/users/create'),
	require('../../app/endpoints/users/update'),
	require('../../app/endpoints/users/delete'),

	//Alerts
	require('../../app/endpoints/alerts/create')
];

module.exports = {
	create: function(server) {
		var endpointValue,
			r = 0, i

		if (!server || !routes)
			throw new error('Routes: Server or Endpoints are not found');

		for (r; r < routes.length; r++) {
			endpointValue = routes[r];
			if (typeof endpointValue === 'object') {
				server.route({
					method: endpointValue.method,
					path: endpointValue.path,
					handler: endpointValue.handler,
					config: endpointValue.config || {}
				});
			}
		}
	}
}