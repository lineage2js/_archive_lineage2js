var ServerPacket = require("./ServerPacket");
var config = require("./../../config/config");

function InitLS() {
	var sessionID = 0x03ed779c;
	
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x00)
		.writeD(sessionID)
		.writeD(config.base.PROTOCOL_VERSION.SERVER);

	return this._packet.getBuffer();
}

module.exports = InitLS;