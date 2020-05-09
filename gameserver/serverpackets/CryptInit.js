let ServerPacket = require("./ServerPacket");

function CryptInit(key) {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x00)
		.writeC(0x01) // 0x00 - protocol version is different, 0x01 - ok
		.writeC(key[0])
		.writeC(key[1])
		.writeC(key[2])
		.writeC(key[3])
		.writeC(key[4])
		.writeC(key[5])
		.writeC(key[6])
		.writeC(key[7]);

	return this._packet.getBuffer();
}

module.exports = CryptInit;
