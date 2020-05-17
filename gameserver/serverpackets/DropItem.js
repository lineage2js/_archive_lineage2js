let ServerPacket = require("./ServerPacket");

function DropItem(character, item) {
	this._packet = new ServerPacket(37);
	this._packet.writeC(0x16)
		.writeD(character.objectId)
		.writeD(item.objectId)
		.writeD(item.itemId)
		.writeD(character.x + 20)
		.writeD(character.y + 20)
		.writeD(character.z)
		.writeD(0) // is a stackable
		.writeD(1) // item count ?
		.writeD(1) // unknow

	return this._packet.getBuffer();
}

module.exports = DropItem;