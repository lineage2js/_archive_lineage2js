let ServerPacket = require("./ServerPacket");

function AutoAttackStop(objectId) {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0x3c)
		.writeD(objectId)
		
	return this._packet.getBuffer();
}

module.exports = AutoAttackStop;