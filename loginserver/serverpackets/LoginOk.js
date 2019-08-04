var ServerPacket = require("./ServerPacket.js");

function LoginOk(SessionKey1) {
	var packet = new ServerPacket(48);

	packet.writeC(0x03)
		.writeD(SessionKey1[0])
		.writeD(SessionKey1[1])
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x000003ea)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x02);

	return packet._buffer;
}

module.exports = LoginOk;