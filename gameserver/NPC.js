var fs = require("fs");

class NPC {
	constructor(file) {
		this._file = file;
		this._storage = null;

		this._init();
	}

	spawn() {

	}

	get(id) {
		return this._storage.filter(data => data.id === id)[0];
	}

	_readFile() {
		this._storage = JSON.parse(fs.readFileSync(this._file, "utf-8"))
	}

	_init(){ 
		this._readFile();
	}
}

module.exports = NPC;