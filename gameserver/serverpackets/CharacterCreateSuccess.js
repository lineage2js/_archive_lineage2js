let ServerPacket = require("./ServerPacket");

function CharacterCreateSuccess() {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0x25)
		.writeD(0x01);
		
	return this._packet.getBuffer();
}

module.exports = CharacterCreateSuccess;