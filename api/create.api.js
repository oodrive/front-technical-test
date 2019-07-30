const shortid = require('shortid');
const fs = require('fs');

const { error } = require('./shared/response');
const { checkName } = require('./shared/checks');
const { FS_PATH } = require('./shared/paths');
const db = require('./shared/db');
const { decorateItem } = require('./shared/item');

module.exports = function (app) {
	app.post('/api/items', (req, res, next) => {
		if (req.busboy) {
			// handled by create.api.js
			return next();
		}

		const parentId = req.query.parentId || undefined;

		const body = req.body;

		if (!body.name) {
			return error(req, res, 400, 'MISSING_NAME', 'missing name');
		}

		if (!checkName(body.name)) {
			return error(req, res, 400, 'INVALID_NAME', 'invalid name');
		}

		const dbItems = db.get('items');

		if (parentId && !dbItems.find((item) => item.id === parentId && item.folder).value()) {
			return error(req, res, 404, 'PARENT_NOT_FOUND', 'cannot find parent');
		}

		if (dbItems.some((item) => item.parentId === parentId && item.name === body.name).value()) {
			return error(req, res, 400, 'NAME_EXISTS', 'name already exists');
		}

		const date = new Date().toISOString();

		const newItem = {
			id: shortid.generate(),
			parentId,
			name: body.name,
			folder: !!body.folder,
			creation: date,
			modification: date,
		};

		if (!body.folder) {
			fs.writeFileSync(`${FS_PATH}/${newItem.id}`, '', 'UTF-8');
		}

		dbItems
			.push(newItem)
			.write()
		;

		res.status(201).send(decorateItem(newItem));
	});
};
