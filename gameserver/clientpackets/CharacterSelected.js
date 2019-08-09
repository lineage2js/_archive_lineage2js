var ClientPacket = require("./ClientPacket.js");

function CharacterSelected(buffer) {
	this._packet = new ClientPacket(buffer);
	this._packet.readC()
		.readD();
}

CharacterSelected.prototype.getCharacterSlot = function() {
	return this._packet.getData()[1];
}

module.exports = CharacterSelected;