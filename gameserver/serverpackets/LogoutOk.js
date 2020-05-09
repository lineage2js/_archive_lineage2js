let ServerPacket = require("./ServerPacket");

function LogoutOK() {
	this._packet = new ServerPacket(1);
	this._packet.writeC(0x96);

	return this._packet.getBuffer();
}

module.exports = LogoutOK;