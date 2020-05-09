let ServerPacket = require("./ServerPacket");

function DeleteObject(objectId) {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0x1e)
		.writeD(objectId);

	return this._packet.getBuffer();
}

module.exports = DeleteObject;