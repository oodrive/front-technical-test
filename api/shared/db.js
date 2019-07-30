const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const { DB_FILE_PATH } = require('./paths');

const adapter = new FileSync(DB_FILE_PATH);
const db = low(adapter);

module.exports = db;
