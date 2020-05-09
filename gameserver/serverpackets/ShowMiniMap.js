let ServerPacket = require("./ServerPacket");

function ShowMiniMap(id) {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0xb6)
		.writeD(id);
		
	return this._packet.getBuffer();
}

module.exports = ShowMiniMap;