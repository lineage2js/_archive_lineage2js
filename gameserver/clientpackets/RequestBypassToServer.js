let ClientPacket = require("./ClientPacket");

class RequestBypassToServer {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readS()

		this._init();
	}

	getCommand() {
		return this._data.getData()[1];
	}

	_init() {
		let command = this.getCommand();
	}
}


module.exports = RequestBypassToServer;