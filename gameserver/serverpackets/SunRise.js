let ServerPacket = require("./ServerPacket");

function SunRise() {
	this._packet = new ServerPacket(1);
	this._packet.writeC(0x28);

	return this._packet.getBuffer();
}

module.exports = SunRise;