/*------------------------------------*\
	[AGENTS] UPLOAD
\*------------------------------------*/

var Boom 	= require('boom');
var Joi 	= require('joi');
var Agents 	= require('../../config/tables').agents;
var AWS 	= require('aws-sdk');

var handleUpload = {
	method: 'POST',
	path: '/agents/{ACMID}/upload',
	handler: imageUpload,
	config: {
		validate: {
			options: {
				abortEarly: true			
			},
			payload: {
				images: Joi.required()
			}
		},
		payload: {
			output: 'file',
			parse: true, 
			maxBytes: 1000000,
			uploads: './uploads'
  		}
	}
}

function imageUpload(req, reply) {

	var data = req.payload.images,
		i = 0;

	var s3 = new AWS.S3({
		accessKeyId: "AKIAIRPF3N2HZBUESIUA",
		secretAccessKey: "XXX"
	});

	if (data.length) {
		for (i; i < data.length; i++) {
			uploadToAws(data[i]);
		}
	} else {
		uploadToAws(data);
	}

	function uploadToAws(image) {
		s3.upload({
			Key: req.params.ACMID,
			Bucket: "casamestra-images",
			ACL:"public-read",
			Body: image.path
		}, function(err, output) {
			if (err) {
				console.log(err);
				//reply({error: err});
			} else {
				console.log('success');
				//reply(output);
			}
		});
	}

	reply(data);
}
module.exports = handleUpload;