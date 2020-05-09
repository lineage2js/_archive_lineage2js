let ServerPacket = require("./ServerPacket");

function Ride(player) {
	this._packet = new ServerPacket(17);
	this._packet.writeC(0x9f)
		.writeD(player.objectId)
		.writeD(1) // 1 for mount ; 2 for dismount
		.writeD(2) // 1 for Strider ; 2 for wyvern
		.writeD(12621 + 1000000) // npcID

	return this._packet.getBuffer();
}

module.exports = Ride;