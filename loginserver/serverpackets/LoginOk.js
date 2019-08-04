var ServerPacket = require("./ServerPacket.js");

function LoginOk() {
	var packet = new ServerPacket(48);

	packet.writeC(0x03)
		.writeD(0x55555555)
		.writeD(0x44444444)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x000003ea)
		.writeD(0x00)
		.writeD(0x00)
		.writeD(0x02);

	return packet._buffer;
}

module.exports = LoginOk;