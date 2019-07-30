const fs = require('fs');
const mime = require('mime-types');

const { error } = require('./shared/response');
const db = require('./shared/db');
const { FS_PATH } = require('./shared/paths');

module.exports = function (app) {
	app.get('/api/items/:id', (req, res) => {
		const id = req.params.id;

		const item = db.get('items').find((item) => item.id === id).value();

		if (!item) {
			return res.sendStatus(404);
		}

		if (item.folder) {
			return error(req, res, 404, 'IS_FOLDER', 'Item is a folder');
		}

		if (!fs.existsSync(`${FS_PATH}/${id}`)) {
			return error(req, res, 500, 'ITEM_NOT_ON_FS', 'Could not find file on FS');
		}

		res
			.set('Content-Type', mime.contentType(item.name))
			.set('Content-Disposition', `Content-Disposition: inline; filename="${item.name}"`)
			.sendFile(`${FS_PATH}/${id}`)
		;
	});
};
