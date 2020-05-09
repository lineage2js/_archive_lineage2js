let ServerPacket = require("./ServerPacket");

function AttackCanceled(player) {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0x0a)
		.writeD(player.objectId)
		
	return this._packet.getBuffer();
}

module.exports = AttackCanceled;