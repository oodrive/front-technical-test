module.exports = {
	checkName(name) {
		return !!name && !name.match(/[\\/\n\t"*?<>|:]/);
	},
};
