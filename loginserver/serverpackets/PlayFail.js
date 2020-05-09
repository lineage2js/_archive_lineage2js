let ServerPacket = require("./ServerPacket");

function PlayFail(reason) {
	this._packet = new ServerPacket(12);
	this._packet.writeC(0x06)
		.writeC(reason);

	return this._packet.getBuffer();
}

module.exports = PlayFail;