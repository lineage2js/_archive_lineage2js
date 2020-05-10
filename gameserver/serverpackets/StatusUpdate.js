let ServerPacket = require("./ServerPacket");

function StatusUpdate(objectId) {
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x1a)
		.writeD(objectId)
		.writeD(2) // attributes count
		.writeD(0x09) // hp ID
		.writeD(50) // hp value
		.writeD(0x0a) // max hp id
		.writeD(65) // max hp value

	return this._packet.getBuffer();
}

module.exports = StatusUpdate;