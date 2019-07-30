const db = require('./shared/db');
const { decorateItem, decorateList } = require('./shared/item');
const { error } = require('./shared/response');

module.exports = function (app) {
	app.get('/api/items', (req, res) => {
		const parentId = req.query.parentId || undefined;

		const dbItems = db.get('items');

		if (parentId && !dbItems.find((item) => item.id === parentId && item.folder).value()) {
			return error(req, res, 404, 'PARENT_NOT_FOUND', 'cannot find parent');
		}

		const items = dbItems
			.filter((item) => item.parentId === parentId)
			.value()
		;

		res.send(decorateList(parentId, {
			items: items
				.sort((a, b) => {
					if (a.folder !== b.folder) {
						return a.folder ? -1 : 1;
					}
					return a.name.localeCompare(b.name, 'en', { numeric: true, sensitivity: 'base' });
				})
				.map(decorateItem),
		}));
	});
};
