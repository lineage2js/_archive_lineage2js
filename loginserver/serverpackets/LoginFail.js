let ServerPacket = require("./ServerPacket");

function LoginFail(reason) {
	this._packet = new ServerPacket(12);
	this._packet.writeC(0x01)
		.writeC(reason);

	return this._packet.getBuffer();
}

module.exports = LoginFail;