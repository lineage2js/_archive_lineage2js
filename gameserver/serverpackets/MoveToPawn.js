let ServerPacket = require("./ServerPacket");

function MoveToPawn(player) {
	this._packet = new ServerPacket(25);
	this._packet.writeC(0x75)
		.writeD(player.objectId)
		.writeD(player.target)
		.writeD(36) // distance
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		
	return this._packet.getBuffer();
}

module.exports = MoveToPawn;