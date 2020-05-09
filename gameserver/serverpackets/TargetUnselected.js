let ServerPacket = require("./ServerPacket");

function TargetUnselected(player) {
	this._packet = new ServerPacket(21);
	this._packet.writeC(0x3a)
		.writeD(player.objectId)
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z)
		.writeD(player.objectId);
		
	return this._packet.getBuffer();
}

module.exports = TargetUnselected;