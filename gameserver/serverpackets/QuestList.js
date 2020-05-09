let ServerPacket = require("./ServerPacket");

function QuestList(quests) {
	this._packet = new ServerPacket(5);
	this._packet.writeC(0x98)
		.writeH(0x00)
		.writeH(0x00);

	return this._packet.getBuffer();
}

module.exports = QuestList;