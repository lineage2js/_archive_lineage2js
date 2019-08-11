var file = require("fs");

function IdFactory(path) {
	this._FIRST_OID = 0x10000000;
	this._path = path;
	this._data = this.loadCurrentState();
	
	if(this._data === false) {
		this._data = { id: this._FIRST_OID };
		this.saveCurrentState();
		this._data = this.loadCurrentState();
	}
}

IdFactory.prototype.getNextId = function() {
	var id = this._data.id;
	
	this._data.id++;
	this.saveCurrentState();

	return id;
}

IdFactory.prototype.saveCurrentState = function() {
	file.writeFileSync(this._path, JSON.stringify(this._data));
}

IdFactory.prototype.loadCurrentState = function() {
	var data = file.readFileSync(this._path, "utf-8");

	if(data.length === 0) {
		return false
	} else {
		return JSON.parse(data);
	}
}

module.exports = IdFactory;