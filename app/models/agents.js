var settings = require('../config/settings');
var thinky = require('thinky')(settings.db);
var type = thinky.type;

var Agents = thinky.createModel('Agents', {
	firstName: type.string(),
	lastName: type.string(),
	email: type.string(),
	phones: {
		cellphone: type.number(),
		homephone: type.number(),		
	},
	description: type.string(),
	experience: [{
        company: [type.string()],
        specialities: [type.string()]
    }],
	creci: type.number()
}); 

module.exports = Agents;