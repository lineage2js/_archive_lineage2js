let fs = require("fs");

class Announcements {
	constructor(file) {
		this._announcements = JSON.parse(fs.readFileSync(file, "utf-8"));
	}

	show(callback) {
		for(let i = 0; i < this._announcements.length; i++) {
			callback(this._announcements[i]);
		}
	}
}

module.exports = Announcements;