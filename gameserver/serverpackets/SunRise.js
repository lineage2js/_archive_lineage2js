var ServerPacket = require("./ServerPacket.js");

function SunRise() {
	this._packet = new ServerPacket(10);
	this._packet.writeC(0x28);

	return this._packet.getBuffer();
}

module.exports = SunRise;