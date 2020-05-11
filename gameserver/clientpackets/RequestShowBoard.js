let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");
let html = require("./../../gameserver/Html");

class RequestShowBoard {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	_init() {
		this._player.sendPacket(new serverPackets.ShowBoard(html.get("tutorial_001")));
	}
}

module.exports = RequestShowBoard;