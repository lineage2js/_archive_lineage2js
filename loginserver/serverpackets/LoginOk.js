let ServerPacket = require("./ServerPacket");

function LoginOk(SessionKey1) {
	this._packet = new ServerPacket(48);
	this._packet.writeC(0x03)
		.writeD(SessionKey1[0])
		.writeD(SessionKey1[1])
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x000003ea)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x02);

	return this._packet.getBuffer();
}

module.exports = LoginOk;