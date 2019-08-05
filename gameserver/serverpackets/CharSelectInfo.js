var ServerPacket = require("./ServerPacket.js");

function CharSelectInfo() {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x1f)
		.writeD(0x00);
		
	return this._packet.getBuffer();
}

module.exports = CharSelectInfo;