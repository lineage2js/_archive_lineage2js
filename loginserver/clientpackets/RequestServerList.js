let log = require("./../../util/log");
let serverPackets = require("./../../loginserver/serverpackets/serverPackets");
let config = require("./../../config/config");
let ClientPacket = require("./ClientPacket");

class RequestServerList {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD() // sessionKey1 first part
			.readD() // sessionKey1 last part

		this._init();
	}

	getSessionKey1() {
		let sessionKey1 = [];

		sessionKey1[0] = this._data.getData()[1].toString(16);
		sessionKey1[1] = this._data.getData()[2].toString(16);

		return sessionKey1;
	}

	_init() {
		let sessionKey1Client = this.getSessionKey1();

		if(this._packet.keyComparison(this._packet.getSessionKey1Server(), sessionKey1Client)) {
			this._player.sendPacket(new serverPackets.ServerList(config.gameserver.host, config.gameserver.port, config.gameserver.maxPlayer));
		}
	}

}

module.exports = RequestServerList;