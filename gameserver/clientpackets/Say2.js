var serverPackets = require("./../../gameserver/serverpackets/serverPackets");
var ClientPacket = require("./ClientPacket");
var ALL = 0;
var SHOUT = 1;
var TELL = 2;
var PARTY = 3;
var CLAN = 4;
var PRIVATE_CHAT_PLAYER = 6; // used for petition
var PRIVATE_CHAT_GM = 7; // used for petition
var TRADE = 8;
var GM_MESSAGE = 9;
var ANNOUNCEMENT = 10;

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
		this._packet.send(new serverPackets.CreateSay(this._player, this.getType(), this.getText()));
		this._packet.broadcast(new serverPackets.CreateSay(this._player, this.getType(), this.getText()));
	}

	// if(this._packet.getData()[2] === TELL) { // fix
	// 	this._packet.readS();
	// }
}

module.exports = Say2;