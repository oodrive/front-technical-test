const shortid = require('shortid');
const fs = require('fs');

const { FS_PATH } = require('./shared/paths');
const db = require('./shared/db');
const { decorateItem } = require('./shared/item');
const { checkName } = require('./shared/checks');
const { error } = require('./shared/response');

module.exports = function (app) {
	app.post('/api/items', (req, res, next) => {
		if (!req.busboy) {
			next();
			return;
		}

		const parentId = req.query.parentId || undefined;

		const dbItems = db.get('items');

		if (parentId && !dbItems.find((item) => item.id === parentId && item.folder).value()) {
			return error(req, res, 404, 'PARENT_NOT_FOUND', 'cannot find parent');
		}

		const date = new Date().toISOString();

		const items = [];
		const existingItems = [];
		const errors = [];

		req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			if (filename.startsWith('/')) {
				errors.push({ name: filename, code: 'INVALID_NAME', desc: 'invalid name' });
				return;
			}

			const chunks = filename.split('/');
			const name = chunks[chunks.length - 1];
			const folders = chunks.splice(0, chunks.length - 1).filter((name) => !!name);

			if (!name) {
				errors.push({ name: filename, code: 'MISSING_NAME', desc: 'missing name' });
				return;
			}

			if (!checkName(name)) {
				errors.push({ name: filename, code: 'INVALID_NAME', desc: 'invalid name' });
				return;
			}

			if (folders.some((name) => !checkName(name))) {
				errors.push({ name: filename, code: 'INVALID_FOLDER_NAME', desc: 'invalid folder name' });
				return;
			}

			const realParentId = folders.reduce((parentId, name) => {
				const folder = dbItems.find((item) => item.parentId === parentId && item.name === name).value() ||
					items.find((item) => item.parentId === parentId && item.name === name)
				;

				if (folder) {
					return folder.id;
				}

				const newFolder = {
					id: shortid.generate(),
					parentId,
					name,
					folder: true,
					creation: date,
					modification: date,
				};

				items.push(newFolder);

				return newFolder.id;
			}, parentId);

			const existingFile = dbItems.find((item) => item.parentId === realParentId && item.name === name).value();

			if (existingFile) {
				existingItems.push(existingFile);

				const writeStream = fs.createWriteStream(`${FS_PATH}/${existingFile.id}`);
				file.pipe(writeStream);
			} else {
				const newItem = {
					id: shortid.generate(),
					parentId: realParentId,
					name,
					folder: false,
					creation: date,
					modification: date,
				};

				items.push(newItem);

				const writeStream = fs.createWriteStream(`${FS_PATH}/${newItem.id}`);
				file.pipe(writeStream);
			}
		});

		req.busboy.on('finish', function () {
			const existingIds = existingItems.map(({ id }) => id);

			dbItems
				.push(...items)
				.filter((item) => existingIds.includes(item.id))
				.each((item) => (item.modification = date))
				.write()
			;

			res.send({ items: [...items, ...existingItems].map(decorateItem), errors });
		});

		req.pipe(req.busboy);
	});
};
