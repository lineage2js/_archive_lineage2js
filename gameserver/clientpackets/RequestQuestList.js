var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class RequestQuestList {
	constructor(packet) {
		this._packet = packet;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC();

		this._init();
	}

	_init() {
		this._packet.send(new serverPackets.QuestList(/* database - quests */));
	}
}

module.exports = RequestQuestList;