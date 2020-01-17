var ServerPacket = require("./ServerPacket");

function CreateSay(player, messageType, message) {
	this._packet = new ServerPacket(9 + ServerPacket.strlen(player.characterName) + ServerPacket.strlen(message)); // fix
	this._packet.writeC(0x5d)
		.writeD(player.objectId)
		.writeD(messageType)
		.writeS(player.characterName)
		.writeS(message);

	return this._packet.getBuffer();
}

module.exports = CreateSay;