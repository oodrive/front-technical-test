const fs = require('fs');

const { error } = require('./shared/response');
const { FS_PATH } = require('./shared/paths');
const db = require('./shared/db');

module.exports = function(app) {
	app.delete('/api/items/:id', (req, res) => {
		const id = req.params.id;

		const item = db.get('items').find((item) => item.id === id).value();

		if (!item) {
			return error(req, res, 404, 'NOT_FOUND', 'item not found');
		}

		const dbItems = db.get('items');

		if (item.folder) {
			const folderIds = getFolderIds(dbItems.value(), item);

			const files = dbItems.filter((item) => !item.folder && folderIds.includes(item.parentId)).value();

			files.forEach((item) => fs.existsSync(`${FS_PATH}/${item.id}`) && fs.unlinkSync(`${FS_PATH}/${item.id}`));

			dbItems
				.remove((item) => item.id === id || folderIds.includes(item.parentId))
				.write()
			;
		} else {
			fs.existsSync(`${FS_PATH}/${id}`) && fs.unlinkSync(`${FS_PATH}/${id}`);

			dbItems
				.remove((item) => item.id === id)
				.write()
			;
		}

		res.status(204).end();
	});
}

function getFolderIds(items, folder) {
	return [folder.id].concat(
		...items
			.filter((item) => item.parentId === folder.id && item.folder)
			.map((folder) => getFolderIds(items, folder)),
	);
}
