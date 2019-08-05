var ServerPacket = require("./ServerPacket.js");

function CryptInit() {
	this._packet = new ServerPacket(12);
	this._packet.writeC(0x00)
		.writeC(0x01)
		.writeD(0x00)
		.writeD(0x00);

	return this._packet.getBuffer();
}

module.exports = CryptInit;