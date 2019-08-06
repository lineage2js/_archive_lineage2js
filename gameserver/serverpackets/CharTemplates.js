var ServerPacket = require("./ServerPacket.js");

function CharTemplates() {
	this._packet = new ServerPacket(20);
	this._packet.writeC(0x23)
		.writeC(0x00)

	return this._packet.getBuffer();
}

module.exports = CharTemplates;