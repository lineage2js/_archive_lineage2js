var ServerPacket = require("./ServerPacket.js");

function InitLS() {
	var packetType = 0x00;
	var PROTOCOL = 0x785a;
	var sessionID = 0x03ed779c;
	
	this._packet = new ServerPacket(9);
	this._packet.writeC(packetType)
		.writeD(sessionID)
		.writeD(PROTOCOL);

	return this._packet.getBuffer();
}

module.exports = InitLS;