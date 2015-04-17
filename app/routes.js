/**
 * ROUTES HANDLER
 */
var routes = {
	agents: {
		'GET': require('../app/endpoints/agents/get'),
		'GET-ONE': require('../app/endpoints/agents/get-one'),
		'POST': require('../app/endpoints/agents/create'),
		'PUT': require('../app/endpoints/agents/update'),
		'DELETE': require('../app/endpoints/agents/delete')
	},
	estates: {
		'GET': require('../app/endpoints/estates/get'),
		'GET-ONE': require('../app/endpoints/estates/get-one'),
		'POST': require('../app/endpoints/estates/create'),
		'PUT': require('../app/endpoints/estates/update'),
		'DELETE': require('../app/endpoints/estates/delete'),
		'IMPORT': require('../app/endpoints/estates/import')
	},
	neighborhoods: {
		'GET': require('../app/endpoints/neighborhoods/get'),
		'GET-ONE': require('../app/endpoints/neighborhoods/get-one'),
		'POST': require('../app/endpoints/neighborhoods/create'),
		'PUT': require('../app/endpoints/neighborhoods/update'),
		'DELETE': require('../app/endpoints/neighborhoods/delete')
	},
	favorites: {
		'GET': require('../app/endpoints/favorites/get'),
		'GET-ESTATE': require('../app/endpoints/favorites/get-user-favorites'),
		'GET-USER': require('../app/endpoints/favorites/get-users-favorited'),
		'POST': require('../app/endpoints/favorites/create'),
		'DELETE': require('../app/endpoints/favorites/delete')
	}
	// users: {
	// 	'GET': require('../app/endpoints/users/get'),
	// 	'GET-ONE': require('../app/endpoints/users/get-one'),
	// 	'POST': require('../app/endpoints/users/create'),
	// 	'PUT': require('../app/endpoints/users/update'),
	// 	'DELETE': require('../app/endpoints/users/delete')
	// }
}

module.exports = {
	create: function(server) {
		var endpointValue,
			e, i

		if (!server || !routes)
			throw new error('Routes: Server or Endpoints are not found');

		for (e in routes) {
			for (i in routes[e]) {
				endpointValue = routes[e][i];
				if (typeof endpointValue === 'function') {
					endpointValue(server);
				}
			}
		}
	}
}