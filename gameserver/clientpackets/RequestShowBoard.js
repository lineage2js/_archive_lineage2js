var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class RequestShowBoard {
	constructor(packet, player, server) {
		this._packet = packet;
		this._player = player;
		this._server = server;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	_init() {
		this._player.sendPacket(new serverPackets.ShowBoard(this._server.html.get("tutorial_001")));
	}
}

module.exports = RequestShowBoard;