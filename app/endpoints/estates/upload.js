/* ------------------------------------ *\
	[ESTATES] UPLOAD
\* ------------------------------------ */

'use strict';

const Boom    = require('boom');
const Joi     = require('joi');
const Async   = require('async');
const Estates = require('../../config/tables').estates;
const _upload = require('../../util/upload');

const upload = (req, reply) => {
	function checkEstate(next) {
		Estates
			.get(req.params.ecmid)
			.run()
			.then(result => {
				if (result) {
					next(null, result);
				} else {
					next(Boom.notFound('Sorry, this estate not exist'));
				}
			}).error(() => next(Boom.badRequest('Try again some time')));
	}

	function uploadImage(estate, next) {
		_upload(req.payload.file, {
			eager: [
				{
					width: 200,
					height: 200,
					crop: 'thumb',
					gravity: 'face',
				},
			],
		}, result => next(null, result));
	}

	function createObject(result) {
		let imageObject;
		const coverIndex = req.payload.cover;

		imageObject = {
			cover: '',
			photos: [],
		};

		if (Array.isArray(result)) {
			imageObject.cover = result[coverIndex].eager[0].url;
			result.forEach(function each(value, index) {
				const url = result[index].eager[0].url;
				imageObject.photos.push(url);
			});
		} else {
			imageObject.cover = result.eager[0].url;
			imageObject.photos.push(result.eager[0].url);
		}

		return imageObject;
	}

	function updateEstate(image, next) {
		const changes = createObject(image);

		Estates
			.get(req.params.ecmid)
			.update(changes)
			.run()
			.then(result => {
				if (result.replaced === 0) {
					next(Boom.badRequest('Something bad happen :('));
				} else {
					next(null, {
						status: 'success',
						message: 'The estate was updated',
					});
				}
			}).error(() => next(Boom.badRequest('Something bad happen :(')));
	}

	Async.waterfall([
		checkEstate,
		uploadImage,
		updateEstate,
	], (err, result) => {
		reply(result || err);
	});
};

module.exports = {
	method: ['PATCH'],
	path: '/estates/{ecmid}/upload',
	handler: upload,
	config: {
		validate: {
			options: {
				abortEarly: false,
			},
			payload: {
				cover: Joi.number().required(),
				file: Joi.any(),
			},
		},
		payload: {
			output: 'file',
			maxBytes: 209715200,
			allow: 'multipart/form-data',
			uploads: 'uploads',
		},
	},
};
