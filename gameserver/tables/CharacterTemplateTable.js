function CharacterTemplateTable(data) {
	this._data = data;
	this._result = null;

	this.serialization();
}

CharacterTemplateTable.prototype.serialization = function() {
	this._result = {};

	for(var i = 0; i < this._data.length; i++) {
		this._result[this._data[i].classId] = this._data[i];
	}
}

CharacterTemplateTable.prototype.getData = function() {
	return this._result;
}

module.exports = CharacterTemplateTable;