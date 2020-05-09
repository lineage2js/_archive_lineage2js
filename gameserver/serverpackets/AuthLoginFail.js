let ServerPacket = require("./ServerPacket");

function AuthLoginFail(reason) {
	this._packet = new ServerPacket(2);
	this._packet.writeC(0x12)
		.writeC(reason);
		
	return this._packet.getBuffer();
}

module.exports = AuthLoginFail;