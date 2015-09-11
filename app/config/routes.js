/* ------------------------------------ *\
	[ROUTES]
\* ------------------------------------ */

'use strict';

const routes = [
	// Agents
	require('../../app/endpoints/agents/get'),
	require('../../app/endpoints/agents/get-one'),
	require('../../app/endpoints/agents/create'),
	require('../../app/endpoints/agents/update'),
	require('../../app/endpoints/agents/delete'),
	require('../../app/endpoints/agents/upload'),

	// Estates
	require('../../app/endpoints/estates/get'),
	require('../../app/endpoints/estates/get-one'),
	require('../../app/endpoints/estates/get-buy'),
	require('../../app/endpoints/estates/get-rent'),
	require('../../app/endpoints/estates/create'),
	require('../../app/endpoints/estates/update'),
	require('../../app/endpoints/estates/delete'),
	require('../../app/endpoints/estates/import'),
	require('../../app/endpoints/estates/upload'),

	// Neighborhoods
	require('../../app/endpoints/neighborhoods/get'),
	require('../../app/endpoints/neighborhoods/get-one'),
	require('../../app/endpoints/neighborhoods/create'),
	require('../../app/endpoints/neighborhoods/update'),
	require('../../app/endpoints/neighborhoods/delete'),

	// Favorites
	require('../../app/endpoints/favorites/get-estates-by-user'),
	require('../../app/endpoints/favorites/get-users-by-estate'),
	require('../../app/endpoints/favorites/create'),
	require('../../app/endpoints/favorites/delete'),

	// Users
	require('../../app/endpoints/users/get'),
	require('../../app/endpoints/users/get-one'),
	require('../../app/endpoints/users/create'),
	require('../../app/endpoints/users/update'),
	require('../../app/endpoints/users/delete'),

	// Alerts
	require('../../app/endpoints/alerts/create'),
	require('../../app/endpoints/alerts/delete'),
	require('../../app/endpoints/alerts/get'),
	require('../../app/endpoints/alerts/get-one'),
	require('../../app/endpoints/alerts/get-alerts-by-user'),

	// Recommendations
	require('../../app/endpoints/recommendations/create'),
	require('../../app/endpoints/recommendations/delete'),
	require('../../app/endpoints/recommendations/get-estates-by-user'),
	require('../../app/endpoints/recommendations/get-users-by-estate'),
];

const create = server => {
	if (!server || !routes) throw new Error('Routes: Server or Endpoints are not found');
	routes.forEach(endpoint => {
		if (typeof endpoint === 'object') {
			server.route({
				method: endpoint.method,
				path: endpoint.path,
				handler: endpoint.handler,
				config: endpoint.config || {},
			});
		}
	});
};

module.exports = { create };
