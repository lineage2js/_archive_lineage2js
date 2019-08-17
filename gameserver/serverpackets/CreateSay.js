var ServerPacket = require("./ServerPacket.js");

function CreateSay(objectId, messageType, characterName, message) {
	this._packet = new ServerPacket(9 + ServerPacket.strlen(characterName) + ServerPacket.strlen(message)); // fix
	this._packet.writeC(0x5d)
		.writeD(objectId)
		.writeD(messageType)
		.writeS(characterName)
		.writeS(message);

	return this._packet.getBuffer();
}

module.exports = CreateSay;