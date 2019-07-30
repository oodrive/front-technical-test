const db = require('./shared/db');
const { decorateItem } = require('./shared/item');
const { error } = require('./shared/response');

module.exports = function (app) {
	app.get('/api/items/:id/path', (req, res) => {
		const id = req.params.id;

		const dbItems = db.get('items');

		const item = dbItems.find((item) => item.id === id).value();

		if (!item) {
			return error(req, res, 404, 'NOT_FOUND', 'item not found');
		}

		const path = getPath(dbItems, item);

		res.send({ items: path.map(decorateItem) });
	});
};

function getPath(items, item) {
	if (!item) {
		return [];
	}
	return [
		...getPath(items, items.find(({ id }) => item.parentId === id).value()),
		item,
	];
}
