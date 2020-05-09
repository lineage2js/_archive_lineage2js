let ServerPacket = require("./ServerPacket");

function ChangeMoveType(player) {
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x3e)
		.writeD(player.objectId)
		.writeD(player.getMoveType());

	return this._packet.getBuffer();
}

module.exports = ChangeMoveType;