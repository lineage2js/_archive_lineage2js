var ServerPacket = require("./ServerPacket.js");

function CharacterCreateFail(reason) {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x26)
		.writeD(reason);
		
	return this._packet.getBuffer();
}

module.exports = CharacterCreateFail;