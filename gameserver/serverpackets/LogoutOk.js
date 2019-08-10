var ServerPacket = require("./ServerPacket.js");

function LogoutOK() {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x96)

	return this._packet.getBuffer();
}

module.exports = LogoutOK;