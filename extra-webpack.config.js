module.exports = {
	devServer: {
		before: (app, server) => {
			require('./api/init.js')(app, server);
		}
	}
};
