// initialize DB if needed

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const busboy = require('connect-busboy');
const globby = require('globby');

const { DB_FILE_PATH, DB_PATH, FS_PATH } = require('./shared/paths');

module.exports = function (app, server) {
	app.use(cors());
	app.use(express.json()); // for parsing application/json
	app.use(busboy({ preservePath: true })); // for parsing multipart

	if (!fs.existsSync(DB_FILE_PATH)) {
		console.log('Initializing database');

		fs.mkdirSync(DB_PATH);
		fs.mkdirSync(FS_PATH);

		const db = require('./shared/db');

		const folderId = shortid.generate();
		const date = new Date().toISOString();
		const defaultItems = [
			{
				id: shortid.generate(),
				parentId: undefined,
				name: 'file_1.txt',
				folder: false,
				creation: date,
				modification: date,
			},
			{
				id: shortid.generate(),
				parentId: undefined,
				name: 'file_2.txt',
				folder: false,
				creation: date,
				modification: date,
			},
			{
				id: folderId,
				parentId: undefined,
				name: 'folder_1',
				folder: true,
				creation: date,
				modification: date,
			},
			{
				id: shortid.generate(),
				parentId: folderId,
				name: 'file_3.txt',
				folder: false,
				creation: date,
				modification: date,
			},
		];

		defaultItems
			.filter(({ folder }) => !folder)
			.forEach(({ id }) => {
				fs.writeFileSync(`${FS_PATH}/${id}`, `File ${id} contents`, 'UTF-8');
			})
		;

		db.defaults({ items: defaultItems })
			.write()
		;
	}

	globby.sync(`${__dirname}/**/*.api.js`.replace(/\\/g, '/')).forEach((file) => {
		require(file)(app, server);
	});
};
