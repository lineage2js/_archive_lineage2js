var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");

class RequestShowBoard {
	constructor(packet, server) {
		this._packet = packet;
		this._server = server;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD();

		this._init();
	}

	_init() {
		this._packet.send(new serverPackets.ShowBoard(this._server.html.get("tutorial_001")));
	}
}

module.exports = RequestShowBoard;