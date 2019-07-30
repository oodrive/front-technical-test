module.exports = {
	decorateItem: (item) => {
		return {
			...item,
			_links: {
				...(item.folder ? {} : { 'download': { href: `/api/items/${item.id}`, type: 'GET' } }),
				...(!item.folder ? {} : { 'children': { href: `/api/items?parentId=${item.id}`, type: 'GET' } }),
				'delete': { href: `/api/items/${item.id}`, type: 'DELETE' },
				'update': { href: `/api/items/${item.id}`, type: 'PATCH' },
				...(item.folder ? {} : { 'create': { href: `/api/items?parentId=${item.id}`, type: 'POST' } }),
				...(item.upload ? {} : { 'upload': { href: `/api/items?parentId=${item.id}`, type: 'POST' } }),
			}
		};
	},
	decorateList: (id, list) => {
		return {
			...list,
			_links: {
				'@create': { href: `/api/items?parentId=${id}`, type: 'POST' },
				'@upload': { href: `/api/items/upload?parentId=${id}`, type: 'POST' },
			}
		};
	}
};
