var ServerPacket = require("./ServerPacket.js");

function InitLS() {
	var packet = new ServerPacket(9);
	var packetType = 0x00;
	var protocol = 0x785a;
	var sessionID = 0x03ed779c;

	packet.writeC(packetType)
		.writeD(sessionID)
		.writeD(protocol);

	return packet._buffer;
}

module.exports = InitLS;