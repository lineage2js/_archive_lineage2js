let ServerPacket = require("./ServerPacket");

function SpawnItem(item, x, y, z) {
	this._packet = new ServerPacket(29);
	this._packet.writeC(0x15)
		.writeD(item.objectId)
		.writeD(item.itemId)
		.writeD(x)
		.writeD(y)
		.writeD(z)
		.writeD(0) // is a stackable
		.writeD(1) // item count ?

	return this._packet.getBuffer();
}

module.exports = SpawnItem;