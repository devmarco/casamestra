/* ------------------------------------ *\
	[UTIL] UPLOAD
\* ------------------------------------ */

'use strict';

const cloudinary 	= require('cloudinary');
const fs 			= require('fs');

// Set the config
cloudinary.config({
	cloud_name: 'devmarco',
	api_key: '837274918949914',
	api_secret: 'dhUZ-sewxOYXrkpmBBx9giKEHP4',
});

// Fn
const CloudinaryUpload = (file, opts, callback) => {
	const results = [];
	const options = opts || {};
	let next = 0;

	function removeTempFile(tempFile) {
		setTimeout(function remove() {
			fs.unlink(tempFile);
		}, 2000);
	}

	function uploadImageArray() {
		cloudinary.uploader.upload(file[next++].path, result => {
			results.push(result);

			// Remove temporary files
			removeTempFile(file[next].path);

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
		cloudinary.uploader.upload(file.path, result => {
			callback(result);
			// Remove temporary files
			removeTempFile(file.path);
		}, options);
	}
};

module.exports = CloudinaryUpload;
