/* ------------------------------------ *\
	[AGENTS] UPLOAD
\* ------------------------------------ */

var _upload = require('../../util/upload');

function upload(req, reply) {
	_upload(req.payload.file, {
		eager: [
			{
				width: 200,
				height: 200,
				crop: 'thumb',
				gravity: 'face',
			},
		],
	}, function result(result) {
		reply(result);
	});
}

module.exports = {
	method: ['PATCH'],
	path: '/agents/{acmid}/upload',
	handler: upload,
	config: {
		payload: {
			output: 'file',
			maxBytes: 209715200,
			allow: 'multipart/form-data',
			uploads: 'uploads',
		},
	},
};
