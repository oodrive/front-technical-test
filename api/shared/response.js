module.exports = {
	error(req, res, status, code, desc) {
		res.status(status).format({
			text() {
				res.send(`${status} - ${code} - ${desc}`);
			},
			html() {
				res.send(`${status} - ${code} - ${desc}`);
			},
			json() {
				res.send({ code, desc });
			},
		});
	},
};
