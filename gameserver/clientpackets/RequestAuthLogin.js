let config = require("./../../config/config");
let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let templates = require("./../../gameserver/templates/templates");
let ClientPacket = require("./ClientPacket");

class RequestAuthLogin {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readS()
			.readD()
			.readD()
			.readD()
			.readD();

		this._init();
	}

	getLogin() {
		return this._data.getData()[1];
	}

	getSessionKey1() {
		let sessionKey1 = [];

		sessionKey1[0] = this._data.getData()[4].toString(16);
		sessionKey1[1] = this._data.getData()[5].toString(16);

		return sessionKey1;
	}

	getSessionKey2() {
		let sessionKey2 = [];

		sessionKey2[0] = this._data.getData()[3].toString(16);
		sessionKey2[1] = this._data.getData()[2].toString(16);

		return sessionKey2;
	}

	_init() {
		let sessionKey1Client = this.getSessionKey1();
		let sessionKey2Client = this.getSessionKey2();
		let charactersList = [];
		let charactersData;

		this._player.login = this.getLogin();
		charactersData = this._player.getCharacters();

		for(let i = 0; i < charactersData.length; i++) {
			charactersList.push(new templates.Character(charactersData[i]));
		}

		if(this._packet.keyComparison(this._packet.getSessionKey1Server(), sessionKey1Client) && this._packet.keyComparison(this._packet.getSessionKey2Server(), sessionKey2Client)) {
			// Загружать из БД список персонажей
			this._player.sendPacket(new serverPackets.CharacterSelectInfo(charactersList, this._player));
		} else {
			this._player.sendPacket(new serverPackets.AuthLoginFail(config.base.errors.gameserver.REASON_SYSTEM_ERROR));
		}
	}
}

module.exports = RequestAuthLogin;