/* ------------------------------------ *\
	[UTIL] UPLOAD
\* ------------------------------------ */

var cloudinary = require('cloudinary');
var fs = require('fs');
var upload;

// Set the config
cloudinary.config({
	cloud_name: 'devmarco',
	api_key: '837274918949914',
	api_secret: 'dhUZ-sewxOYXrkpmBBx9giKEHP4',
});

// Fn
CloudinaryUpload = function upload(file, opts, callback) {
	var results = [];
	var next = 0;
	var options = opts || {};

	function removeTempFile(file) {
		setTimeout(function remove() {
			fs.unlink(file);
		}, 2000);
	}

	function uploadImageArray() {
		cloudinary.uploader.upload(file[next].path, function result(result) {
			results.push(result);

			// Remove temporary files
			removeTempFile(file[next].path);

			next++;

			if (next < file.length) {
				uploadImageArray();
			} else {
				callback({
					result: results,
				});
			}
		}, options);
	}

	if (Array.isArray(file)) {
		uploadImageArray();
	} else {
		cloudinary.uploader.upload(file.path, function result(result) {
			callback(result);

			// Remove temporary files
			removeTempFile(file.path);
		}, options);
	}
};

module.exports = CloudinaryUpload;
