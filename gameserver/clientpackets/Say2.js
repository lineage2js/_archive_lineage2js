let serverPackets = require("./../../gameserver/serverpackets/serverPackets");
let ClientPacket = require("./ClientPacket");
let ALL = 0;
let SHOUT = 1;
let TELL = 2;
let PARTY = 3;
let CLAN = 4;
let PRIVATE_CHAT_PLAYER = 6; // used for petition
let PRIVATE_CHAT_GM = 7; // used for petition
let TRADE = 8;
let GM_MESSAGE = 9;
let ANNOUNCEMENT = 10;

class Say2 {
	constructor(packet, player) {
		this._packet = packet;
		this._player = player;
		this._data = new ClientPacket(this._packet.getBuffer());
		this._data.readC()
			.readS()
			.readD();

		this._init();
	}

	getText() {
		return this._data.getData()[1];
	}
	getType() {
		return this._data.getData()[2];
	}
	getTarget() {
		return this._data.getData()[3];
	}

	_init() {
		this._player.sendPacket(new serverPackets.CreateSay(this._player, this.getType(), this.getText()));
		this._player.broadcast(new serverPackets.CreateSay(this._player, this.getType(), this.getText()));
	}
}

module.exports = Say2;