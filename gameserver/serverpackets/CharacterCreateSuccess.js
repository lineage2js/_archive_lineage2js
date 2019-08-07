var ServerPacket = require("./ServerPacket.js");

function CharacterCreateSuccess() {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x25)
		.writeD(0x01);
		
	return this._packet.getBuffer();
}

module.exports = CharacterCreateSuccess;