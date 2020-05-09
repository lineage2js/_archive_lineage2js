let ServerPacket = require("./ServerPacket");

function ChangeWaitType(player) {
	this._packet = new ServerPacket(21);
	this._packet.writeC(0x3f)
		.writeD(player.objectId)
		.writeD(player.getWaitType())
		.writeD(player.x)
		.writeD(player.y)
		.writeD(player.z);

	return this._packet.getBuffer();
}

module.exports = ChangeWaitType;