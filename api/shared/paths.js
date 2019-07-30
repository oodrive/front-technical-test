const path = require('path');

const DB_PATH = path.resolve(`${process.cwd()}/db`);

module.exports = {
	DB_PATH,
	DB_FILE_PATH: `${DB_PATH}/db.json`,
	FS_PATH: `${DB_PATH}/fs`,
};
