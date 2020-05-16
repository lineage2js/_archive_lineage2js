let ServerPacket = require("./ServerPacket");

function CreateSay(player, type, message) {
	this._packet = new ServerPacket(9 + ServerPacket.strlen(player.name) + ServerPacket.strlen(message)); // fix
	this._packet.writeC(0x5d)
		.writeD(player.objectId)
		.writeD(type)
		.writeS(player.name)
		.writeS(message);

	return this._packet.getBuffer();
}

module.exports = CreateSay;