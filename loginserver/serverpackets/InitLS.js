let ServerPacket = require("./ServerPacket");
let config = require("./../../config/config");

function InitLS() {
	let sessionID = 0x03ed779c;
	
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x00)
		.writeD(sessionID)
		.writeD(config.base.PROTOCOL_VERSION.SERVER);

	return this._packet.getBuffer();
}

module.exports = InitLS;