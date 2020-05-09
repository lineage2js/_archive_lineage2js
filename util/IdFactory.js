let file = require("fs");

class IdFactory {
	constructor(path) {
		this._FIRST_OID = 0x10000000;
		this._path = path;
		this._data = this.loadCurrentState();
		
		if(this._data === false) {
			this._data = { id: this._FIRST_OID };
			this.saveCurrentState();
			this._data = this.loadCurrentState();
		}
	}

	getNextId() {
		let id = this._data.id;
		
		this._data.id++;
		this.saveCurrentState();

		return id;
	}

	saveCurrentState() {
		file.writeFileSync(this._path, JSON.stringify(this._data));
	}

	loadCurrentState() {
		let data = file.readFileSync(this._path, "utf-8");

		if(data.length === 0) {
			return false
		} else {
			return JSON.parse(data);
		}
	}
}

module.exports = IdFactory;