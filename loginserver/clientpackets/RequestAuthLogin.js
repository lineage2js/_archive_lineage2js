let log = require("./../../util/log");
let serverPackets = require("./../../loginserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");

class RequestAuthLogin {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readB(14) // login length
			.readB(16) // password length

		this._init();
	}

	getLogin() {
		return this._data.getData()[1].toString("ascii").replace(/\u0000/gi, "");
	}

	getPassword() {
		return this._data.getData()[2].toString("ascii").replace(/\u0000/gi, "");
	}

	_init() {
		let status = this._player.checkAccount(this.getLogin(), this.getPassword());

		log(`player ${this.getLogin()} requesting auth login`);

		if(status === "success") {
			this._player.sendPacket(new serverPackets.LoginOk(this._packet.getSessionKey1Server()));
		} else {
			this._player.sendPacket(new serverPackets.LoginFail(status));
		}
	}
}

module.exports = RequestAuthLogin;