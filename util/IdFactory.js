let fs = require("fs");

class IdFactory {
	constructor() {
		this._FIRST_OID = 0x10000000;
		this._data = null;
		this._path = null;
	}

	addFile(path) {
		this._path = path;
		this._load();
	}

	getNextId() {
		let id = this._data.id;
		
		this._data.id++;
		this._save();

		return id;
	}

	_save() {
		fs.writeFileSync(this._path, JSON.stringify(this._data));
	}

	_load() {
		let data = fs.readFileSync(this._path, "utf-8");

		if(data.length === 0) {
			this._data = { id: this._FIRST_OID };
			this._save();
		} else {
			this._data = JSON.parse(data);
		}
	}
}

module.exports = new IdFactory();