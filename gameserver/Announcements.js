let fs = require("fs");

class Announcements {
	constructor() {
		this._data = null;
	}

	addFile(path) {
		this._data = JSON.parse(fs.readFileSync(path, "utf-8"));
	}

	each(callback) {
		for(let i = 0; i < this._data.length; i++) {
			callback(this._data[i]);
		}
	}
}

module.exports = new Announcements();