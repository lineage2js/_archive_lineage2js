var ServerPacket = require("./ServerPacket.js");

function InitLS() {
	var packet = new ServerPacket(9);
	var packetType = 0x00;
	var PROTOCOL = 0x785a;
	var sessionID = 0x03ed779c;

	packet.writeC(packetType)
		.writeD(sessionID)
		.writeD(PROTOCOL);

	return packet._buffer;
}

module.exports = InitLS;