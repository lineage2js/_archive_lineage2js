let ServerPacket = require("./ServerPacket");

function Die(player) {
	this._packet = new ServerPacket(29);
	this._packet.writeC(0x0b)
		.writeD(player.objectId)
		.writeD(1)
		.writeD(1)
		.writeD(1)
		.writeD(1)
		.writeD(0)
		.writeD(1)
		
	return this._packet.getBuffer();
}

module.exports = Die;