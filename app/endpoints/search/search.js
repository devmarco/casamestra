/*------------------------------------*\
	[SEARCH] FULL TEXT SEARCH
\*------------------------------------*/

var Joi  = require('joi');
var reds = require('reds');

var handleSearch = {
	method: 'POST',
	path: '/search',
	handler: searchText,
	config: {
		validate: {
			options: {
				abortEarly: false
			},
			payload: {
				text: Joi.string().required()
			}
		}
	}
}

function searchText(req, reply) {

	var search = reds.createSearch('estates');

	var strs = []

	strs.push();

	search
	.query(query = req.payload.text)
	.end(function(err, ids){
		if (err) throw err;
		console.log('Search results for "%s":', query);
		ids.forEach(function(id){
			console.log('  - %s', strs[id]);
		});
		process.exit();
	});

	reply({});
} 

module.exports = handleSearch;
