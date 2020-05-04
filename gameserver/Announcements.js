var file = require("fs");

class Announcements {
	constructor(filePath) {
		this._announcements = JSON.parse(file.readFileSync(filePath, "utf-8"));
	}

	show(handler) {
		for(var i = 0; i < this._announcements.length; i++) {
			handler(this._announcements[i]);
		}
	}
}

module.exports = Announcements;