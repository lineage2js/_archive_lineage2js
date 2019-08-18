var ServerPacket = require("./ServerPacket.js");

function ChangeMoveType(player, moveType) {
	this._packet = new ServerPacket(9);
	this._packet.writeC(0x3e)
		.writeD(player.objectId)
		.writeD(moveType);

	return this._packet.getBuffer();
}

module.exports = ChangeMoveType;