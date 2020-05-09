let log = require("./../../util/log");
let serverPackets = require("./../../loginserver/serverpackets/serverPackets");
let config = require("./../../config/config");
let ClientPacket = require("./ClientPacket");

class RequestServerLogin {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readD() // sessionKey1 first part
			.readD() // sessionKey1 last part
			.readC() // Server number

		this._init();
	}

	getSessionKey1() {
		let sessionKey1 = [];

		sessionKey1[0] = this._data.getData()[1].toString(16);
		sessionKey1[1] = this._data.getData()[2].toString(16);

		return sessionKey1;
	}

	getServerNumber() {
		return this._data.getData()[3];
	}

	_init() {
		let sessionKey1Client = this.getSessionKey1();
		let serverNumber = this.getServerNumber();

		if(this._packet.keyComparison(this._packet.getSessionKey2Server(), sessionKey1Client)) {
			// Проверка на доступность сервера / Check server status
			if(true) {
				this._player.sendPacket(new serverPackets.PlayOk(this._packet.getSessionKey2Server()));
			} else {
				this._player.sendPacket(new serverPackets.PlayFail(config.base.errors.loginserver.REASON_SYSTEM_ERROR))
			}
		}
	}
}

module.exports = RequestServerLogin;