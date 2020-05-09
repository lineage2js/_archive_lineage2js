let ServerPacket = require("./ServerPacket");

function StatusUpdate(objectId) {
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x1a)
		.writeD(objectId)
		.writeD(2) // attributes count
		.writeD(0x09) // hp
		.writeD(50)
		.writeD(0x0a) // mapHP
		.writeD(65) // mapHP

	return this._packet.getBuffer();
}

module.exports = StatusUpdate;