const db = require('./shared/db');
const { decorateItem } = require('./shared/item');
const { checkName } = require('./shared/checks');
const { error } = require('./shared/response');

module.exports = function (app) {
	app.patch('/api/items/:id', (req, res) => {
		const id = req.params.id;

		const body = req.body;

		const dbItems = db.get('items');
		const item = dbItems.find((item) => item.id === id);

		if (!item.value()) {
			return error(req, res, 404, 'NOT_FOUND', 'item not found');
		}

		if ('name' in body && !checkName(body.name)) {
			return error(req, res, 400, 'INVALID_NAME', 'invalid name');
		}

		if ('parentId' in body && !dbItems.find((item) => item.id === body.parentId)) {
			return error(req, res, 404, 'PARENT_NOT_FOUND', 'cannot find parent');
		}

		if ('name' in body) {
			const parentId = 'parentId' in body ? body.parentId || undefined : item.value().parentId;
			if (dbItems.some((item) => item.parentId === parentId && item.name === body.name && item.id !== id).value()) {
				return error(req, res, 400, 'NAME_EXISTS', 'name already exists');
			}
		}

		if (!('name' in body || 'parentId' in body)) {
			return error(req, res, 400, 'NO_DATA', 'nothing to update');
		}

		const date = new Date().toISOString();

		const newItem = item
			.assign({
				name: 'name' in body ? body.name : item.value().name,
				parentId: 'parentId' in body ? body.parentId || undefined : item.value().parentId,
				modification: date,
			})
		;

		newItem.write();

		res.send(decorateItem(newItem.value()));
	});
};
