/*------------------------------------*\
	[AGENTS] UPLOAD
\*------------------------------------*/

var Boom 							= require('boom');
var Joi 							= require('joi');
var Agents 						= require('../../config/tables').agents;
var TransloaditClient = require("transloadit");
var formidable 				= require('formidable');
var fs 								= require('fs');

var handleUpload = {
	method: 'POST',
	path: '/agents/upload',
	handler: imageUpload,
	config: {
		payload:{
				maxBytes:209715200,
				allow: 'multipart/form-data'
		}
	}
}

function imageUpload(req, reply) {

	console.log(req.payload.files);

	var client = new TransloaditClient({
		authKey: '39575f7020f211e59ce6414129454e12',
		authSecret: '19c44bde497233a5432015b598d887f4dc38219c'
	});

	var fieldName = 'my_file';
	var filePath = 'ABSOLUTE_PATH_TO_SOME_FILE';

	client.addStream('files', req.payload.files);

	var opts = {
		params: {
			template_id: 'bac9b260241211e5ab88e55411778119'
		}
	};

	client.createAssembly(opts, function(err, result) {
		if (err) {
			console.log(err, 'fail');
		} else {
			reply({});
			console.log('success');
		}
		console.log(result);
	});
}
module.exports = handleUpload;