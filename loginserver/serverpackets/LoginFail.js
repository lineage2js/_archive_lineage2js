var ServerPacket = require("./ServerPacket.js");

function LoginFail(reason) {
	this._packet = new ServerPacket(16);
	this._packet.writeC(0x01)
		.writeC(reason)

	return this._packet.getBuffer();
}

module.exports = LoginFail;